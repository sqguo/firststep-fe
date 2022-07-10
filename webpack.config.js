const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = function (_env, argv) {
  const isProduction = argv.mode === "production";

  return {
    entry: "./src/index.tsx",
    plugins: [new Dotenv()],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              envName: isProduction ? "production" : "development",
            },
          },
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
  };
};
