"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const screens_1 = require("../screens");
exports.Routes = {
    AuthResolver: {
        path: 'AuthResolver',
        component: screens_1.AuthResolver,
    },
    Splash: {
        path: '/',
        component: screens_1.Splash,
    },
    Home: {
        path: '/board',
        component: screens_1.Home,
    },
};
