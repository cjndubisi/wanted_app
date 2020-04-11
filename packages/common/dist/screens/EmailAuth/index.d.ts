/// <reference types="react" />
import { User } from '../../api/types';
export declare type FormState = Partial<User & {
    password: string;
    confirm_password: string;
}>;
export declare type FormErrorState = FormState;
declare const _default: () => JSX.Element;
export default _default;
