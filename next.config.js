const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
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
  redirects: async () => [
    {
      source: "/where",
      destination: "https://data.breq.dev/",
      permanent: false,
    },
    {
      source: "/changelog",
      destination: "https://github.com/breqdev/breq.dev/commits/main/",
      permanent: false,
    },
    {
      source: "/log",
      destination: "https://github.com/breqdev/breq.dev/commits/main/",
      permanent: false,
    },
    {
      source: "/hello",
      destination: "/contact",
      permanent: false,
    },
    {
      source: "/subscribe",
      destination: "/follow",
      permanent: false,
    },
    {
      source: "/feeds",
      destination: "/follow",
      permanent: false,
    },
    {
      source: "/feed.xml",
      destination: "/rss.xml",
      permanent: false,
    },
    {
      source: "/postroll",
      destination: "/blogroll",
      permanent: false,
    },
    {
      source: "/verify",
      destination: "/contact",
      permanent: false,
    },
  ],
});

// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: "breq",
    project: "breqdev",
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors.
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  }
);
