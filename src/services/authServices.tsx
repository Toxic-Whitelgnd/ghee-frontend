import axios from "axios"

import { toast } from "react-toastify";
import { User, UserLogin } from "../types/userTypes";
import { updateUser } from "../slice/userSlice";
import { useNavigate } from "react-router-dom";



export  const  AuthRegisterService = async (userData : User) =>{
    const api = 'http:/localhost:8080/';
    try {
        // await  axios.post(`${api}/api/register`, userData );
         toast.success("Registeration successful");
        
    } catch (error) {
        toast.error("Registration Failed");
    }
}

export const AuthLoginService = async (userData : UserLogin, dispatch: any) =>{
  
    try {
       
        //const response = await axios.get(`${api}/api/login`, userData);
        dispatch(updateUser({
            name: "Tarun", //will use from the response
            password: userData.password,
            mobilenumber: "1234567890",
            email: userData.email,
        }));
        toast.success("Login successful");
        window.location.href = '#/'
    } catch (error) {
        toast.error("Login Failed");
    }
}