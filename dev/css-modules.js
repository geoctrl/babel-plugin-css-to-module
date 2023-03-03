export const cssModules = (strings, ...args) => {
  const evalString = strings
    .map((item, i) => {
      return `${item}${args[i] || ""}`;
    })
    .join("");

  const [id, classNameObject, styles] = evalString.split("||CSS_MODULES||");
  let s;
  try {
    s = JSON.parse(classNameObject);
  } catch (e) {
    throw Error("[babel-plugin-inline-css-modules]");
  }
  if (id && classNameObject && styles) {
    return { s, css: { styles, id } };
  }
  return evalString;
};
