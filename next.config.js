module.exports = {
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
};
