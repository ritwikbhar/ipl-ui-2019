import { Comment } from "../../api";

export interface InternalizedPost {
    id? : string,
    text? : string,
    dateTime?: string,
    image?: object,
    userId: string,
    userDisplayName: string,
    currentComment?: string,
    comments? : InternalizedComment[]
}

export interface InternalizedComment extends Comment{
    userDisplayName : string
}