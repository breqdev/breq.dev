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


exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    const projects = await graphql(`
        {
            allMdx(filter: { fileAbsolutePath: { regex: "\\/projects/" } }) {
                edges {
                    node {
                        id
                        slug
                    }
                }
            }
        }
    `)

    projects.data.allMdx.edges.forEach(({ node }) => {
        createPage({
            path: "projects/" + node.slug,
            component: path.resolve("./src/templates/project.js"),
            context: { id: node.id },
        })
    })

    const posts = await graphql(`
        {
            allMdx(filter: { fileAbsolutePath: { regex: "\\/posts/" } }) {
                edges {
                    node {
                        id
                        slug
                    }
                }
            }
        }
    `)

    posts.data.allMdx.edges.forEach(({ node }) => {
        createPage({
            path: node.slug.replaceAll("-", "/"),
            component: path.resolve("./src/templates/post.js"),
            context: { id: node.id },
        })
    })
}
