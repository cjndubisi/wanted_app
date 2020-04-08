"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const styled_1 = require("../styled");
exports.default = ({ navigation }) => {
    react_1.useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);
    return react_1.default.createElement(styled_1.Container, { style: { margin: 20 } });
};
