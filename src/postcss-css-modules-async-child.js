const { argv } = require("node:process");
const postcss = require("postcss");
const postcssModules = require("postcss-modules");

const cssArg = "css=";
const pluginArg = "plugins=";
const optsArg = "opts=";
let evalString = "";
let plugins = [];
let opts = {};

argv.forEach((arg) => {
  if (arg.startsWith(cssArg)) {
    evalString = decodeURIComponent(arg.slice(cssArg.length));
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
      getJSON(cssFilename, json, outputFilename) {
        classNames = json;
      },
      ...opts,
    }),
  ]).process(evalString, {
    from: undefined,
  });
  process.stdout.write(JSON.stringify({ output: result.css, classNames }));
})();
