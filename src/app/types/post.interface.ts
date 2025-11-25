// ISO 8601 date/time string
export type ISODateString = string;

// define the post interface
export interface Post {
    id: string;
    title: string;
    author: string;
    body: string;
    category: string;
    favorite: boolean;
    date: ISODateString;
    createdAt: ISODateString;
    updatedAt: ISODateString;
}

export type PostInput = Omit<Post, 'id'>

// define the post category interface
export interface PostCategory {
    value: string;
    viewValue: string;
}