/// <reference types="react" />
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../router';
declare type SpashNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
declare type Prop = {
    navigation: SpashNavigationProp;
};
declare const _default: ({ navigation }: Prop) => JSX.Element;
export default _default;
