"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const native_1 = __importDefault(require("styled-components/native"));
exports.ErrorLabel = native_1.default.Text `
  font-size: 12px;
  color: red;
  height: 13px;
  margin-bottom: 6px;
`;
exports.Input = native_1.default.TextInput `
  height: 40px;
  color: black;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 14px;
  border-radius: 5px;
  background-color: white;
`;
