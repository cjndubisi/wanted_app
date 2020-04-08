/// <reference types="react" />
import { StackNavigationProp } from '@react-navigation/stack';
import { User } from '../../../api/types';
import { RootStackParamList } from '../../../router';
export declare type FormState = Partial<User & {
    password: string;
    confirm_password: string;
}>;
export declare type FormErrorState = FormState;
declare const _default: ({ navigation }: {
    navigation: StackNavigationProp<RootStackParamList, "EmailAuth">;
}) => JSX.Element;
export default _default;
