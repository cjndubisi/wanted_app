"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stack_1 = require("@react-navigation/stack");
const react_1 = __importDefault(require("react"));
const EmailAuth_1 = __importDefault(require("./EmailAuth"));
const Splash_1 = __importDefault(require("./Splash"));
const Stack = stack_1.createStackNavigator();
exports.default = () => {
    return (react_1.default.createElement(Stack.Navigator, { initialRouteName: "Splash", screenOptions: { gestureEnabled: false } },
        react_1.default.createElement(Stack.Screen, { name: "Splash", component: Splash_1.default }),
        react_1.default.createElement(Stack.Screen, { name: "EmailAuth", component: EmailAuth_1.default, options: {
                title: 'Sign up with Email',
                headerStyle: { backgroundColor: '#f4511e' },
                headerLeft: null,
                headerTitleAlign: 'center',
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold' },
            } })));
};
