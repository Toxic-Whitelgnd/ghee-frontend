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
}

export interface UserLogin {
    email: string;
    password: string;
}