"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const react_native_1 = require("react-native");
const components_1 = require("../../components");
const AuthContext_1 = require("../../context/AuthContext");
const styled_1 = require("../../styled");
const formConfig_1 = __importDefault(require("./formConfig"));
const styled_2 = require("./styled");
const isWeb = react_native_1.Platform.OS == 'web';
exports.default = () => {
    var _a;
    const { signUpWithEmail, state } = react_1.default.useContext(AuthContext_1.AuthContext);
    const [info, setInfo] = react_1.useState({});
    const [formError, setFormError] = react_1.useState({});
    // To prevent rendering page, as cannot dispatch { error: null } to contect from here
    const [showingAPIError, setShowingAPIError] = react_1.useState(false);
    const signUp = () => __awaiter(void 0, void 0, void 0, function* () {
        const errors = formConfig_1.default.reduce((acc, next) => {
            const error = next.validation(info);
            // update empty object only if error exist
            if (error !== '') {
                acc[next.key] = error;
            }
            return acc;
        }, {});
        if (Object.keys(errors).length > 0) {
            return setFormError(errors);
        }
        // sign up
        let request = Object.assign({}, info);
        delete request.confirm_password;
        setShowingAPIError(false);
        yield signUpWithEmail(request);
    });
    if (state.error && !showingAPIError) {
        const error = state.error;
        let viewError = { other: '' };
        Object.keys(error).forEach((key) => {
            // does the key match any form field
            if (info[key] !== undefined) {
                viewError[key] = error[key][0];
            }
        });
        if (Object.keys(viewError).length === 0) {
            viewError.other = (_a = error === null || error === void 0 ? void 0 : error[0]) !== null && _a !== void 0 ? _a : error.message;
        }
        setFormError(Object.assign(Object.assign({}, formError), viewError));
        // Prevent render cause by setFormError
        setShowingAPIError(true);
    }
    return (react_1.default.createElement(styled_1.Container, null,
        react_1.default.createElement(components_1.ActivityLoader, { animating: state.isLoading && !isWeb }),
        react_1.default.createElement(react_native_1.View, { style: { margin: 20, marginTop: 44 } },
            react_1.default.createElement(react_native_1.View, { style: { marginBottom: 20, marginTop: 20 } },
                react_1.default.createElement(styled_1.H1, null, "Wanted"),
                react_1.default.createElement(styled_1.Text, null, "Create an account buy and sell services, product, jobs and more.")),
            react_1.default.createElement(styled_2.ErrorLabel, null),
            formConfig_1.default.map((input) => (react_1.default.createElement(react_native_1.View, { style: { marginBottom: 12 }, key: `input_${input.key}` },
                react_1.default.createElement(react_native_1.View, { style: {
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                    } },
                    react_1.default.createElement(styled_1.Label, { bold: true }, input.placeholder),
                    react_1.default.createElement(styled_2.ErrorLabel, { accessibilityLabel: `error_${input.key}`, key: `error_${input.key}` }, formError[input.key])),
                react_1.default.createElement(styled_2.Input, { key: input.key, accessibilityLabel: input.key, secureTextEntry: input.key.indexOf('password') !== -1, onChangeText: (text) => {
                        setInfo(Object.assign(Object.assign({}, info), { [input.key]: text }));
                        setFormError(Object.assign(Object.assign({}, formError), { [input.key]: '' }));
                    }, value: info[input.key] || '' }),
                input.key === 'password' ? (react_1.default.createElement(styled_1.InputCaption, null, 'Requires at least an Uppercase letter, a symbol and a number')) : null))),
            react_1.default.createElement(components_1.Button, { bold: true, title: "Sign up with email", onPress: signUp, titleColor: "white", backgroundColor: "brown" }))));
};
