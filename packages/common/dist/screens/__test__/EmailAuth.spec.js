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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@react-navigation/core");
const stack_1 = require("@react-navigation/stack");
const react_native_1 = require("@testing-library/react-native");
const react_1 = __importDefault(require("react"));
const react_test_renderer_1 = require("react-test-renderer");
const EmailAuth_1 = __importDefault(require("../EmailAuth"));
const AuthContext_1 = require("../../context/AuthContext");
const withNavigation = ({ screens = {}, }) => {
    return class extends react_1.default.Component {
        render() {
            const Stack = stack_1.createStackNavigator();
            return (react_1.default.createElement(core_1.BaseNavigationContainer, null,
                react_1.default.createElement(Stack.Navigator, null, Object.keys(screens).map((name) => (react_1.default.createElement(Stack.Screen, { key: name, name: name, component: screens[name].component }))))));
        }
    };
};
const renderWithNavigation = ({ screens = {} }) => {
    const NavigationComponent = withNavigation({ screens });
    const Component = withProviders(NavigationComponent);
    return Object.assign({}, react_native_1.render(react_1.default.createElement(Component, null)));
};
const withProviders = (Component) => {
    const signUpWithEmail = jest.fn();
    return class extends react_1.default.Component {
        render() {
            return (react_1.default.createElement(AuthContext_1.AuthProvider, { value: { signUpWithEmail } },
                react_1.default.createElement(Component, null)));
        }
    };
};
it('renders correctly', () => {
    const EmailNavigation = withNavigation({ screens: { EmailAuth: { component: EmailAuth_1.default } } });
    const Auth = withProviders(EmailNavigation);
    const tree = react_test_renderer_1.create(react_1.default.createElement(Auth, null)).toJSON();
    expect(tree).toMatchSnapshot();
});
test('cannot submit with empty fields', () => __awaiter(void 0, void 0, void 0, function* () {
    const screens = { screens: { EmailAuth: { component: EmailAuth_1.default } } };
    const { findByLabelText, getByTitle } = renderWithNavigation(screens);
    react_native_1.fireEvent.press(getByTitle(/Sign up with email/i));
    yield expect(findByLabelText('Last name is too short')).toBeTruthy();
}));
test('test can sign up', () => __awaiter(void 0, void 0, void 0, function* () {
    const formInput = {
        first_name: 'random',
        last_name: 'random',
        email: 'random@random.com',
        password: 'random',
        confirm_password: 'random',
    };
    const screens = { screens: { EmailAuth: { component: EmailAuth_1.default } } };
    const { getByLabelText } = renderWithNavigation(screens);
    const keys = Object.keys(formInput).reduce((acc, next) => {
        acc[next] = next;
        return acc;
    }, {});
    const elements = Object.keys(formInput).reduce((acc, name) => {
        acc[name] = getByLabelText(name);
        return acc;
    }, {});
    Object.keys(elements).forEach((item) => {
        react_native_1.fireEvent.changeText(elements[keys.email], formInput[item]);
    });
    // expect(getByTestId('title').props.children).toMatch('Home page');
    // fireEvent.press(getByText(/About page/i));
    // await expect(findByText('About page')).toBeTruthy();
}));
