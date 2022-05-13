const withMDX = require("@next/mdx")({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [require("remark-math"), require("remark-abcjs")],
    rehypePlugins: [require("rehype-slug"), require("rehype-katex")],
    providerImportSource: "@mdx-js/react",
  },
});

const withTM = require("next-transpile-modules")(["react-twitter-notrack"]);

module.exports = withTM(
  withMDX({
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      config.module.rules.push({
        test: /\.txt/,
        type: "asset/source",
      });

      // config.module.rules.push({
      //   test: /\.svg/,
      //   type: "asset",
      // });

      return config;
    },
    pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  })
);
