// define the post interface
export interface Post {
    id: string;
    title: string;
    author: string;
    category: string;
    body: string;
    createdAt: string;
    updatedAt: string;
}

export type PostInput = Omit<Post, 'id'>