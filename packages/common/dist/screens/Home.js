"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_1 = require("../styled");
exports.default = () => {
    return react_1.default.createElement(styled_1.Container, { style: { margin: 20 } });
};
