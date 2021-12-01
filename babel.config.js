module.exports = function (api) {
  api.cache(false);
  const presets = [
    [
      "@babel/preset-env",
      {
        corejs: { version: 3 },
        useBuiltIns: "usage",
        targets: {
          browsers: [
            "edge >= 16",
            "safari >= 9",
            "firefox >= 57",
            "ie >= 10",
            "ios >= 9",
            "chrome >= 49",
          ],
        },
      },
    ],
  ];
  const plugins = [
    ["@babel/plugin-proposal-decorators", { decoratorsBeforeExport: true }],
    ["@babel/plugin-proposal-class-properties"],
    ["@babel/transform-runtime"],
  ];
  return {
    presets,
    plugins,
  };
};
