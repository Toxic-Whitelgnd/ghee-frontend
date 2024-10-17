import ObjectID from "bson-objectid";

export interface Settings {
    id?: ObjectID;
    emailsetting?: boolean;
    customeremail?:boolean;
    intialsubject?: string;
    intialbody?: string;
}