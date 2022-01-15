const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  mode: "none",
  entry: "./src/app/app.js",
  output: {
    // publicPath: '/s/',
    path: path.resolve(__dirname, "dist"),
    filename: "js/bundle.js",
  },
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    alias: {
      "@less-helpers-module": path.resolve(__dirname, "src/assets/less/helpers"), // alias for less helpers
      "@assets-root-path": path.resolve(__dirname, "src/assets"), // alias for assets (use for images & fonts)
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              name: "images/[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
    new CopyWebpackPlugin([
      "src/index.html",
      {
        from: "src/assets/images",
        to: "images",
      },
    ]),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  devServer: {
    contentBase: "/dist/",
    port: 3000,
    historyApiFallback: true,
  },
};
