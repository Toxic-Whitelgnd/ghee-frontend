import { toast } from "react-toastify";
import { Settings } from "../types/settingTypes";
import axios, { AxiosResponse } from "axios";
import { APIS, EMAIL, SETTING } from "../utils/constants";

export const settingServiceUpdate = async (setting: Settings) => {
    console.log(setting);
    try {
        const res:AxiosResponse<Settings> = await axios.put(`${APIS.API}${APIS.CONTEXT}${SETTING.SETTING}`,
            setting
        );
        console.log(res);
        toast.success("Settings Updated Successfully");
    } catch (error) {
        toast.error("Failed to update setting");
    }
}

export const settingServiceGet = async() : Promise<Settings | undefined >=>{
    try {
        const res:AxiosResponse<Settings> = await axios.get(`${APIS.API}${APIS.CONTEXT}${SETTING.SETTING}`
        );
        console.log(res);
        return res.data;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}