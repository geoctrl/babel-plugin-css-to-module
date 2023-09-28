const { argv } = require("node:process");
const postcss = require("postcss");
const postcssModules = require("postcss-modules");
const postcssMinify = require("postcss-minify");

const cssArg = "css=";
const nameArg = "name=";
const pluginArg = "plugins=";
const optsArg = "opts=";
let evalString = "";
let name = "";
let plugins = [];
let opts = {};

argv.forEach((arg) => {
  if (arg.startsWith(cssArg)) {
    evalString = decodeURIComponent(arg.slice(cssArg.length));
  }
  if (arg.startsWith(nameArg)) {
    name = decodeURIComponent(arg.slice(nameArg.length));
  }
  if (arg.startsWith(pluginArg)) {
    plugins = JSON.parse(decodeURIComponent(arg.slice(pluginArg.length)));
  }
  if (arg.startsWith(optsArg)) {
    opts = JSON.parse(decodeURIComponent(arg.slice(optsArg.length)));
  }
});

(async () => {
  let classNames = {};
  const result = await postcss([
    ...plugins,
    postcssModules({
      generateScopedName: `${name}__[local]--[hash:base64:5]`,
      getJSON(cssFilename, json, outputFilename) {
        classNames = json;
      },
      ...opts,
    }),
    postcssMinify,
  ]).process(evalString, {
    from: undefined,
  });
  process.stdout.write(JSON.stringify({ output: result.css, classNames }));
})();
