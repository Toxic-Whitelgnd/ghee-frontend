export interface EmailTemplate {
    id: number;
    title: string;
    subject: string;
    body: string;
    status: string;
    isdefault?: boolean; 
}

export interface EmailTemplateDTO{
    title: string;
    subject: string;
    body: string;
    status: string;
    isdefault?: boolean; 
}

export interface EmailTemplateResponse {
    id: number;
    title: string;
    subject: string;
    body: string;
    status: string;
    isDefault?: boolean; 
}

export interface EmailTemplateAllResponse {
    emailtempaltes: EmailTemplate[]
}