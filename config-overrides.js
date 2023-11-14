const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function override(config, env) {
  config.module.rules = [
    ...config.module.rules,
    {
      exclude: /node_modules/,
      test: /\.s[ac]ss$/i,
      use: [
         MiniCssExtractPlugin.loader,
        {
          loader: "css-loader",
          options: {
            modules: {
              auto: (resPath) => Boolean(resPath.includes(".module.")),
              localIdentName: "[hash:base64:8]",
            },
          },
        },
        "sass-loader",
      ],
    },
  ];
  return config;
};
