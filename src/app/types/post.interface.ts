// define the post interface
export interface Post {
    id: string;
    title: string;
    author: string;
    body: string;
    category: string;
    favorite: boolean;
    date: string;
    createdAt: string;
    updatedAt: string;
}

export type PostInput = Omit<Post, 'id'>

// define the post category interface
export interface PostCategory {
    value: string;
    viewValue: string;
}