# `babel-plugin-css-to-module`

[![npm version](https://badge.fury.io/js/babel-plugin-css-to-module.svg)](https://badge.fury.io/js/babel-plugin-css-to-module)

### Description

A babel plugin that transforms css into css-modules using tagged template literals.
The output is an raw string of data which is parsed using either
the react hook [use-inline-css-modules]() or any other custom template literal
tag.

This plugin is framework-agnostic, but we'll be using React in most of the
examples.

### Why

With css modules, you would write css in its own file and import it into your
component:

```css
/* my-styles.css */
.someStyle {
  background-color: red;
}
```

```js
// my-compoennt.jsx
import styles from "./my-styles.css";

function MyComponent() {
  return <div className={styles.someStyle}>Hello, world!</div>;
}
```

`babel-plugin-css-to-module` allows you to write your css as a string inline:

```js
function MyComponent() {
  return <div className={styles.someStyle}>Hello, world!</div>;
}

const { styles } = cssModules`
  background-color: red;
`;
```

This plugin will target the `cssModules` tag (or any other name you want), and
transform the string into parsable raw data.

## Install

This plugin uses [postcss](https://www.npmjs.com/package/postcss), and requires
it as a peer dependency.

```shell
yarn add -D postcss babel-plugin-css-to-module
# or
npm add -D postcss babel-plugin-css-to-module
```

Add plugin to your babel config

```
{
  "plugins": [
    ["babel-plugin-css-to-module", {
      // options here
    }]
  ]
}
```

## Options

### `tagName`

`string`

This plugin works by targeting and transforming specifically named template
literal tags. By default, all template literals named `cssModules` will be
processed. This can be overridden using the `tagName` option.

```
{
  "plugins": [
    ["babel-plugin-css-to-module", {
      "tagName": "customName"
    }]
  ]
}
```

```js
const { styles } = customName`
  .test {
    background-color: red;
  }
`;
```

### `postcssPlugins`

`postcssPlugins` is a passthrough option for postcss plugins. The order of
plugins will be:

`[...passedInPlugins, cssModulePlugin()]`.

### `sassOptions`

`{ additionalData: string; ...restOfSassOptions }`

Because I'm partial to Sass 😉, I've added the ability to run your css through
the Sass engine before being transformed. To enable this, install
[sass](https://www.npmjs.com/package/sass) and add `sassOptions` to
your babel config (object):

```
{
  "plugins": [
    ["babel-plugin-css-to-module", {
      "sassOptions": {}
    }]
  ]
}
```

#### Sass options

The `additionalData` sass option will prepend any sass to the
beginning of your stylesheets (think variables and mixins).

The rest of the properties are pass-through options for sass, and can be found
in their docs: [sass javascript api](https://sass-lang.com/documentation/js-api/).

**Note:** even if you don't need sass options, you still must pass an object for the
sass compiler to run.
