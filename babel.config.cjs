module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false,
        exclude: ["transform-async-to-generator", "transform-regenerator"],
      },
    ],
  ],
  plugins: ["babel-plugin-transform-async-to-promises"],
}
