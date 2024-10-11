import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User, UserLogin } from "../types/userTypes";



const initialState: User = {
    name: '',
    password: '',
    mobilenumber: '',
    email: '',
    isloggedin: false,
    roles: ["USER"],
    address:'',
    pincode: '',
    state: '',
    district: '',
    token: '',
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<Partial<User>>) => {
            return {
                ...state, ...action.payload,
                isloggedin: true
            };
        },
        resetUser: (state) => {
            return initialState;
        },
    },
});


export const { updateUser, resetUser } = userSlice.actions;

export const selectUser = (state: { user: User }) => state.user;

export default userSlice.reducer;