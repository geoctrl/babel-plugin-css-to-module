module.exports = {
  presets: ["@babel/preset-env"],
  plugins: [
    [
      "./src/babel-plugin-css-to-module.js",
      {
        pathToAsyncChild: "src",
        sassOptions: {},
      },
    ],
  ],
};
