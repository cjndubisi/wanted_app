"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Button_1 = __importDefault(require("../components/Button"));
const styled_1 = require("../styled");
exports.default = () => {
    return (react_1.default.createElement(styled_1.Container, { style: { margin: 20, flex: 1, backgroundColor: '#ecf0f1', height: 100 } },
        react_1.default.createElement(styled_1.Title, null, "Wanted"),
        react_1.default.createElement(styled_1.Text, null, "Caption To capture buyers and sellers."),
        react_1.default.createElement(styled_1.Footer, null,
            react_1.default.createElement(Button_1.default, { bold: true, backgroundColor: "brown", title: "Continue with Email", titleColor: "white" }))));
};
