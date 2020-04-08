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
var iscalled = false;
exports.default = (reducer, actions, defaultValue) => {
    const Context = react_1.default.createContext(undefined);
    const Provider = ({ children }) => {
        const [state, dispatch] = react_1.useReducer(reducer, defaultValue);
        const bindingActions = actions(dispatch);
        return (react_1.default.createElement(Context.Provider, { value: Object.assign({ state }, bindingActions) }, children));
    };
    return {
        Context,
        Provider,
    };
};
