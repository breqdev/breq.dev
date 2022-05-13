const pageQuery = `
{
    allMdx(
        filter: {
            fileAbsolutePath: { regex: "/(projects|posts|writing)/" }
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
                    description
                }
            }
        }
    }
}
`;

function pageToAlgoliaRecord({ node: { id, fields, frontmatter, ...rest } }) {
  return {
    objectID: id,
    ...fields,
    ...frontmatter,
    ...rest,
  };
}

module.exports = [
  {
    query: pageQuery,
    transformer: ({ data }) => data.allMdx.edges.map(pageToAlgoliaRecord),
    indexName: "breq.dev",
  },
];
