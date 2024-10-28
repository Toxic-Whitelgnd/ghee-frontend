import axios, { AxiosResponse } from "axios"

import { toast } from "react-toastify";
import { AuthResponse, User, UserLogin, UserPasswordReset, UserRegisterDTO } from "../types/userTypes";
import { updateUser } from "../slice/userSlice";
import { useNavigate } from "react-router-dom";
import { APIS, AUTHAPI } from "../utils/constants";
import { BillingDetails } from "../types/orderTypes";



export  const  AuthRegisterService = async (userData : User, dispatch: any) =>{
    const userRegister : UserRegisterDTO =  {
        username:userData.name,
        emailaddress:userData.email,
        mobilenumber:userData.mobilenumber,
        password:userData.password,
    }

    try {
        JSON.stringify(userRegister)
        const response: AxiosResponse<AuthResponse> = await axios.post(`${APIS.API}${APIS.CONTEXT}${AUTHAPI.REGISTER}`, userRegister);
        const token = response.data.token;
        const user = response.data.user;

        const loginuser: User = {
            name: user.username,
            password: user.password,
            email: user.emailaddress,
            mobilenumber: user.mobilenumber,
            address: user.address,
            pincode: user.pincode,
            district: user.district,
            state: user.state,
            roles: user.roles,
            token: token
        }
        dispatch(updateUser(loginuser));
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(loginuser));
         toast.success("Registeration successful");
         window.location.href = "#/"
        
    } catch (error) {
        toast.error("Registration Failed");
    }
}

export const AuthLoginService = async (userData : UserLogin, dispatch: any) =>{
  
    try {
       
        const response: AxiosResponse<AuthResponse> = await axios.post(`${APIS.API}${APIS.CONTEXT}${AUTHAPI.LOGIN}`, userData);
        const token = response.data.token;
        const user = response.data.user;

        const loginuser: User = {
            name: user.username,
            password: user.password,
            email: user.emailaddress,
            mobilenumber: user.mobilenumber,
            address: user.address,
            pincode: user.pincode,
            district: user.district,
            state: user.state,
            roles: user.roles,
            token: token
        }
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(loginuser));
        dispatch(updateUser(loginuser));
        toast.success("Login successful");
        
        window.location.href = '#/'
    } catch (error) {
        console.log(error);
        toast.error("Login Failed");
    }
}

export const AuthRegisterOnProcessService = async (billingUser: BillingDetails, dispatch: any ) =>{
    try {
        const response: AxiosResponse<AuthResponse> = await axios.post(`${APIS.API}${APIS.CONTEXT}${AUTHAPI.REGISTERONPROCESS}`,
            billingUser
        );
        const token = response.data.token;
        const user = response.data.user;

        const registerduser: User = {
            name: user.username,
            password: user.password,
            email: user.emailaddress,
            mobilenumber: user.mobilenumber,
            address: user.address,
            pincode: user.pincode,
            district: user.district,
            state: user.state,
            roles: user.roles,
            token: token
        }

        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(registerduser));
        dispatch(updateUser(registerduser));
        console.log(response);
        return true;
    } catch (error) {
        console.log(error);
        toast.error("User name already exists");
        return false;
    }
}

export const AuthPasswordRestService = async (user: UserPasswordReset, dispatch: any) =>{
    try {
        const res = await axios.post(`${APIS.API}${APIS.CONTEXT}${AUTHAPI.RESETPASSWORD}`,
            user
        );
        if(res.status === 200) {
            toast.success("Password reset request was sent to your email");
            return true;
        }
    } catch (error) {
        toast.error("User password reset failed");
        return false;
    }
}

export const AuthPasswordChangeService = async (usernew: UserLogin, dispatch: any) =>{
    try {
        const response: AxiosResponse<AuthResponse> = await axios.post(`${APIS.API}${APIS.CONTEXT}${AUTHAPI.RESETNEWPASSWORD}`,
            usernew
        );
        const token = response.data.token;
        const user = response.data.user;

        const loginuser: User = {
            name: user.username,
            password: user.password,
            email: user.emailaddress,
            mobilenumber: user.mobilenumber,
            address: user.address,
            pincode: user.pincode,
            district: user.district,
            state: user.state,
            roles: user.roles,
            token: token
        }
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(loginuser));
        dispatch(updateUser(loginuser));
        toast.success("Login successful");
        
        window.location.href = '#/'

    } catch (error) {
        
    }
}