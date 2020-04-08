/// <reference types="react" />
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../router';
declare type SpashNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;
declare type Prop = {
    navigation: SpashNavigationProp;
};
declare const _default: ({ navigation }: Prop) => JSX.Element;
export default _default;
