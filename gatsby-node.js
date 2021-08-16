const { createFilePath } = require("gatsby-source-filesystem")
const path = require("path")


exports.onCreateWebpackConfig = ({ stage, actions }) => {
    actions.setWebpackConfig({
        module: {
            rules: [
                {
                    test: /\.txt$/,
                    type: "asset/source"
                }
            ]
        }
    })
}


// exports.createSchemaCustomization = ({ actions }) => {
//     actions.createTypes(`
//         type Mdx implements Node {
//             frontmatter: Frontmatter
//         }

//         type Frontmatter {
//             created: String
//             title: String
//             subtitle: String
//             repo: String
//             demo: String
//             image: File
//             video: File
//         }
//     `)
// }


exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions

    if (node.internal.type === "Mdx") {
        const value = createFilePath({ node, getNode })

        createNodeField({
            node,
            name: "slug",
            value: `/projects${value}`,
        })
    }
}


exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    const result = await graphql(`
        {
            allMdx(filter: { fileAbsolutePath: { regex: "\\/projects/" } }) {
                edges {
                    node {
                        id
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `)

    result.data.allMdx.edges.forEach(({ node }) => {
        createPage({
            path: node.fields.slug,
            component: path.resolve("./src/templates/project.js"),
            context: { id: node.id },
        })
    })
}
