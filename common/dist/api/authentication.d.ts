import { RegisterResponse, User } from './types';
export declare const register: (user: Partial<User>) => Promise<RegisterResponse>;
