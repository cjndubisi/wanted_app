"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const Button_1 = __importDefault(require("../../components/Button"));
const styled_1 = require("../../styled");
exports.default = ({ navigation }) => {
    react_1.useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);
    return (react_1.default.createElement(styled_1.Container, { style: { margin: 20 } },
        react_1.default.createElement(styled_1.Title, null, "Wanted"),
        react_1.default.createElement(styled_1.Text, null, "Caption To capture buyers and sellers."),
        react_1.default.createElement(styled_1.Footer, null,
            react_1.default.createElement(Button_1.default, { bold: true, backgroundColor: "brown", title: "Continue with Email", titleColor: "white", onPress: () => navigation.navigate('EmailAuth') }))));
};
