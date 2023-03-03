import { cssModules } from './css-modules';
import './index-3';

const section1 = cssModules`
  .test {
    text-align: right;
    background-color: red;
    other-things: red;
  }
`;

const section2 = cssModules`
  .test {
    text-align: right;
    background-color: red;
    other-things: red;
  }
`;

const otherThings = `things ${`good`} ${`good`} yo`;
