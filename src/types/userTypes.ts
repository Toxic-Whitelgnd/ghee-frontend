export interface User {
    name: string;
    password?: string;
    mobilenumber?: string;
    email: string;
    isloggedin?: boolean;
    roles?: string[];
    address?: string;
    pincode?: string;
    district?: string;
    state?: string;
    token?: string;
}

export interface UserRegisterDTO {
    username: string;
    password?: string;
    mobilenumber?: string;
    emailaddress: string;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserPasswordReset {
    email: string;
}

export interface AuthResponse {
    token: string;
    user: {
        id: number;
        username: string;
        password?: string;
        mobilenumber?: string;
        emailaddress: string;
        isloggedin?: boolean;
        roles?: string[];
        address?: string;
        pincode?: string;
        district?: string;
        state?: string;
    };
}

export interface Profile {
    id?: number;
    username: string;
    password?: string;
    mobilenumber?: string;
    emailaddress: string;
    isloggedin?: boolean;
    roles?: string[];
    address?: string;
    pincode?: string;
    district?: string;
    state?: string;
}

export const initialState: User = {
    name: '',
    password: '',
    mobilenumber: '',
    email: '',
    isloggedin: false,
    roles: ["USER"],
    address: '',
    pincode: '',
    state: '',
    district: '',
    token: '',
}