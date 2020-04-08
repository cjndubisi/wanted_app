"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_1 = require("../styled");
exports.default = ({ title, onPress, bold, backgroundColor, titleColor }) => (react_1.default.createElement(styled_1.Button, { activeOpacity: 0.8, onPress: onPress, backgroundColor: backgroundColor },
    react_1.default.createElement(styled_1.Text, { style: { color: titleColor }, bold: true }, title)));
