const child_process = require("child_process");
const placeholder = "__CSS_MODULES_PLACEHOLDER__";
const separator = "||CSS_MODULES||";

let index = 0;

module.exports = function () {
  return {
    visitor: {
      TaggedTemplateExpression(path, { opts: babelOpts }) {
        let node = path.node;

        const {
          tagName = "cssModules",
          postcssPlugins = [],
          sassOptions,
          ...cssModuleOpts
        } = babelOpts;

        if (node.tag.name === tagName) {
          const strings = node.quasi.quasis;
          let evalString = strings
            .map((item, i) => {
              return `${item.value.raw}${
                node.quasi.expressions[i] ? placeholder : ""
              }`;
            })
            .join("");

          if (sassOptions) {
            const sass = require("sass");
            const { additionalData = "", ...restOfSassOptions } = sassOptions;
            evalString = sass.compileString(
              additionalData + evalString,
              restOfSassOptions
            ).css;
          }

          const encodedCssModuleOpts = encodeURIComponent(
            JSON.stringify(cssModuleOpts)
          );
          const encodedEvalString = encodeURIComponent(evalString);
          const encodedPlugins = encodeURIComponent(
            JSON.stringify(postcssPlugins)
          );

          const bufferResponse = child_process.execSync(
            `node ${process.cwd()}/node_modules/babel-plugin-css-to-module/src/async-child.js css="${encodedEvalString}" plugins="${encodedPlugins}" opts="${encodedCssModuleOpts}"`
          );

          const { output, classNames } = JSON.parse(bufferResponse.toString());

          if (output) {
            const pieces = output.split(placeholder);
            const mString = `m${index}${separator}${JSON.stringify(
              classNames
            )}${separator}`;
            node.quasi.quasis = node.quasi.quasis.map((item, i) => {
              item.value.raw = item.value.cooked = `${i === 0 ? mString : ""}${
                pieces[i]
              }`;
              return item;
            });
            index++;
          }
        }
      },
    },
  };
};
