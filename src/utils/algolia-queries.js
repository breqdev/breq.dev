const pageQuery = `
{
    allMdx(
        filter: {
            fileAbsolutePath: { regex: "/(projects|posts)/" }
        }
    ) {
        edges {
            node {
                id
                fields {
                    slug
                    type
                }
                frontmatter {
                    title
                    subtitle
                }
                excerpt(pruneLength: 20000)
            }
        }
    }
}
`

function pageToAlgoliaRecord({ node: { id, fields, frontmatter, ...rest } }) {
    return {
        objectID: id,
        ...fields,
        ...frontmatter,
        ...rest
    }
}


module.exports = [
    {
        query: pageQuery,
        transformer: ({ data }) => data.allMdx.edges.map(pageToAlgoliaRecord),
        indexName: "breq.dev",
        settings: { attributesToSnippet: [`excerpt:20`] },
    }
]
