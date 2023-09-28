# `babel-plugin-css-to-module`

[![npm version](https://badge.fury.io/js/babel-plugin-css-to-module.svg)](https://badge.fury.io/js/babel-plugin-css-to-module)

Transform css strings into css-modules using tagged template literals.

### The old way

You would write css in its own file and import it into your component using a
module bundler like webpack and the loader `css-loader` to convert it to css
modules:

```css
/* my-styles.css */
.someStyle {
  background-color: red;
}
```

```jsx
// my-component.js
<div className={styles.someStyle}>Hello, world!</div>
```

### The new way

`babel-plugin-css-to-module` allows you to write your css as a template literal
in your javascript file:

```jsx
<div className={styles.someStyle}>Hello, world!</div>;

const { styles } = cssModules`
  .someStyle {
    background-color: red;
  }
`;
```

## Install

This plugin uses [postcss](https://www.npmjs.com/package/postcss), and requires
it as a peer dependency.

```shell
yarn add -D postcss babel-plugin-css-to-module
# or
npm install -D postcss babel-plugin-css-to-module
```

Add plugin to your babel config

```javascript
// babel.config.js
module.exports = {
  plugins: [
    [
      "babel-plugin-css-to-module",
      {
        // options here
      },
    ],
  ],
};
```

## Use

While `babel-plugin-css-to-module` transforms your css to modules, we now need a
way to consume it. This depends highly on your setup and chosen libraries.
For our use-case we built a library for react:
[inline-css-modules-react](https://www.npmjs.com/package/inline-css-modules-react).

## Options

### `tagName`

`string`

This plugin works by targeting and transforming specifically named template
literal tags. By default, all template literals named `cssModules` will be
processed. This can be overridden using the `tagName` option.

```javascript
// babel.config.js
module.exports = {
  plugins: [
    [
      "babel-plugin-css-to-module",
      {
        // options here
      },
    ],
  ],
};
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

```shell
# install sass
yarn add -D sass
```

```javascript
// babel.config.js
module.exports = {
  plugins: [
    [
      "babel-plugin-css-to-module",
      {
        sassOptions: {
          additionalData: "",
          ...restOfSassOptions,
        },
      },
    ],
  ],
};
```

The `additionalData` sass option will prepend any sass to the
beginning of your stylesheets (think variables and mixins).

The rest of the properties are pass-through options for sass, and can be found
in their
docs: [sass javascript api](https://sass-lang.com/documentation/js-api/).

**Note:** even if you don't need sass options, you still need to include
the `sassOptions` property for the sass compiler to run.

### postcssPlugins

`plugins[]`

Postcss plugin passthrough array

## MIT License

Copyright (c) 2023 Tony Lefler

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
