import axios, { AxiosResponse } from "axios"

import { toast } from "react-toastify";
import { AuthResponse, User, UserLogin, UserRegisterDTO } from "../types/userTypes";
import { updateUser } from "../slice/userSlice";
import { useNavigate } from "react-router-dom";
import { APIS, AUTHAPI } from "../utils/constants";



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
        dispatch(updateUser(loginuser));
        toast.success("Login successful");
        
        window.location.href = '#/'
    } catch (error) {
        console.log(error);
        toast.error("Login Failed");
    }
}