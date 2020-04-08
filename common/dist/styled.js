"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const native_1 = __importDefault(require("styled-components/native"));
exports.Container = native_1.default.View `
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-self: center;
  max-width: 467px;
`;
exports.H1 = native_1.default.Text `
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;
exports.Title = native_1.default(exports.H1) `
  text-align: center;
`;
const FText = native_1.default.Text ``;
const FilterText = (_a) => {
    var { bold } = _a, rest = __rest(_a, ["bold"]);
    return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    react_1.default.createElement(FText, Object.assign({}, rest)));
};
exports.Text = native_1.default(FilterText) `
  color: black;
  margin-bottom: 4px;
  /* font-weight: ${(props) => (props.bold ? 'bold' : 'regular')}; */
`;
exports.Label = native_1.default(exports.Text) `
  font-size: 12px;
`;
exports.InputCaption = native_1.default(exports.Text) `
  margin-top: 4px;
  font-size: 10px;
  color: gray;
`;
exports.Button = native_1.default.TouchableOpacity `
  align-items: center;
  justify-content: center;
  height: 40px;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 5px;
  margin-top: 10px;
`;
exports.Footer = native_1.default.View `
  display: flex;
  justify-content: flex-end;
`;
