"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const native_1 = require("@react-navigation/native");
const react_1 = __importDefault(require("react"));
const react_test_renderer_1 = require("react-test-renderer");
const __1 = __importDefault(require(".."));
it('renders correctly', () => {
    const tree = react_test_renderer_1.create(react_1.default.createElement(native_1.NavigationContainer, null,
        react_1.default.createElement(__1.default, null))).toJSON();
    expect(tree).toMatchSnapshot();
});
