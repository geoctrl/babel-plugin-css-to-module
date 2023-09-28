import { cssModules } from "inline-css-modules-react";
// import "./index-2";
//
// let red, other;
//
// const blue = false;
//
// const styles = cssModules`
//   .test {
//     text-align: right;
//     background-color: ${"red" ? "red" : "blue"};
//
//     .tester {
//       background-color: blue;
//     }
//   }
// `;
//
// console.log(styles);

const DUO = cssModules`
  .test {
    text-align: right;
    background-color: ${"red"};
  }
`;

console.log(DUO);
