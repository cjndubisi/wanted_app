"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
let width = react_native_1.Dimensions.get('window').width;
let height = react_native_1.Dimensions.get('window').height;
exports.default = ({ animating }) => {
    return (react_1.default.createElement(react_native_1.View, { style: {
            position: 'absolute',
            flex: 1,
            height,
            width,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            display: animating ? 'flex' : 'none',
            zIndex: 1,
            top: 0,
            left: 0,
            backgroundColor: 'rgba(52, 52, 52, 0.3)',
        } },
        react_1.default.createElement(react_native_1.View, { style: {
                backgroundColor: 'white',
                height: 100,
                width: 100,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
            } },
            react_1.default.createElement(react_native_1.ActivityIndicator, { size: 'large', color: 'gray', animating: animating }))));
};
