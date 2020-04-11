"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    {
        placeholder: 'First Name',
        key: 'first_name',
        validation: (form) => {
            var _a;
            const firstValid = ((_a = form.first_name) === null || _a === void 0 ? void 0 : _a.length) > 2;
            return firstValid ? '' : 'First name is too short';
        },
    },
    {
        placeholder: 'Last Name',
        key: 'last_name',
        validation: (form) => {
            var _a;
            const firstValid = ((_a = form.last_name) === null || _a === void 0 ? void 0 : _a.length) > 2;
            return firstValid ? '' : 'Last name is too short';
        },
    },
    {
        placeholder: 'Email',
        key: 'email',
        validation: (form) => {
            var _a;
            const emailValid = (_a = form.email) === null || _a === void 0 ? void 0 : _a.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            return emailValid ? '' : 'Invalid email';
        },
    },
    {
        placeholder: 'Password',
        key: 'password',
        validation: (form) => {
            var _a;
            const passwordValid = ((_a = form.password) === null || _a === void 0 ? void 0 : _a.length) >= 6;
            return passwordValid ? '' : 'Password is too short';
        },
    },
    {
        placeholder: 'Confirm Passwod',
        key: 'confirm_password',
        validation: (form) => {
            if (form.password !== form.confirm_password) {
                return 'Password does not match';
            }
            return '';
        },
    },
];
