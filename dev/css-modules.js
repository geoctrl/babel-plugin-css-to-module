export const cssModules = (strings, ...args) => {
  const evalString = strings
    .map((item, i) => {
      return `${item}${args[i] || ""}`;
    })
    .join("");

  const [id, classNameObject, styles] = evalString.split("||CSS_MODULES||");
  if (id && classNameObject && styles) {
    return { s: JSON.parse(classNameObject), css: { styles, id } };
  }
  return evalString;
};
