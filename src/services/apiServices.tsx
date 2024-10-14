import { toast } from "react-toastify";
import { Profile, User } from "../types/userTypes";
import axios, { AxiosResponse } from "axios";
import { APIS, AUTHAPI, PROFILE } from "../utils/constants";

export const ProfileUpdateService = async (profile : User) => {
   
    try {
        const user : Profile = {
            username: profile.name,
            emailaddress: profile.email,
            address: profile.address,
            pincode: profile.pincode,
            state: profile.state,
            mobilenumber: profile.mobilenumber,
            district: profile.district
        }
        console.log(user);
        const res = await axios.put(`${APIS.API}${APIS.CONTEXT}${AUTHAPI.ACCOUNT}${PROFILE.PROFILE}`,
            user
        );

        console.log(res.data);
        toast.success("Profile updated Successfully");
        return true;
    } catch (error) {
        toast.error("Failed to update profile");
        return false;
    }
}