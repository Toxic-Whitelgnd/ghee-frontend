import { toast } from "react-toastify"
import { EmailTemplate, EmailTemplateDTO, EmailTemplateAllResponse } from "../types/emailTypes"
import axios, { AxiosResponse } from "axios"
import { APIS, EMAIL } from "../utils/constants"

export const EmailTemplateManagerAdd = async (emailTemplate: EmailTemplate, dispatch: any) => {
    const etdto: EmailTemplateDTO = {
        subject: emailTemplate.subject,
        body: emailTemplate.body,
        isdefault: emailTemplate.isdefault,
        title: emailTemplate.title,
        status: emailTemplate.status
    }
    try {
        const resonse: AxiosResponse<String> = await axios.post(`${APIS.API}${APIS.CONTEXT}${EMAIL.EMAIL}`, etdto);
        if (resonse.status === 200) {
            toast.success("Template added successfully");
            //TODO: update in the store, once get email is implemented
            return true;

        }
    } catch (error) {
        toast.error("Failed to add email template")
        return false;
    }
}

export const EmailTemplateManagerGet: () => Promise<EmailTemplate[] | undefined> = async () => {
    try {
        const response: AxiosResponse<EmailTemplate[]> = await axios.get(`${APIS.API}${APIS.CONTEXT}${EMAIL.EMAIL}`);
        return response.data;

    } catch (error) {
        toast.error("Failed to get the email template")
        return [];
    }
}

export const EmailTemplateManagerUpdate = async (emailTemplate: EmailTemplate) => {
    try {
        const response: AxiosResponse<EmailTemplate> = await axios.put(`${APIS.API}${APIS.CONTEXT}${EMAIL.EMAIL}`, emailTemplate);
        console.log(response.data);
        toast.success("Email template updated successfully");

    } catch (error) {
        toast.error("Failed to update the email template")
    }
}

export const EmailTemplateManagerDelete = async (emailTemplate: EmailTemplate) => {
    try {
        const response = await axios.delete(`${APIS.API}${APIS.CONTEXT}${EMAIL.EMAIL}`, {
            data: emailTemplate
        });
        if (response.status === 200) {
            toast.success("Email template deleted successfully");
            return true;
        }
    } catch (error) {
        toast.error("Failed to delete the email template")
        return false;
    }
}