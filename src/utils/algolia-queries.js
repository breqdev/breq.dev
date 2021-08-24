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
                slug
                frontmatter {
                    title
                    subtitle
                }
                excerpt(pruneLength: 5000)
            }
        }
    }
}
`

function pageToAlgoliaRecord({ node: { id, frontmatter, ...rest } }) {
    return {
        objectID: id,
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
