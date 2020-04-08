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
Object.defineProperty(exports, "__esModule", { value: true });
// const API_URL = 'https://wanted-be.herokuapp.com/v1';
const API_URL = 'http://localhost:3000/v1';
// eslint-disable-next-line import/prefer-default-export
exports.register = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${API_URL}${'/users'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });
    const json = yield response.json();
    if (!response.ok) {
        const errors = json.errors;
        throw new Error(JSON.stringify(errors));
    }
    return json;
});
