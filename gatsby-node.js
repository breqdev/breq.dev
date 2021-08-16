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
