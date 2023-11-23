type CreatePostBody = {
    title: string;
    content?: string;
    published?: boolean;
    authorId: number;
};

type UpdatePostBody = {
    title?: string;
    content?: string;
    published?: boolean;
};

type PostResponse = {
    id: number;
    title: string;
    content?: string;
    published: boolean;
    authorId: number;
};


export {
    CreatePostBody,
    UpdatePostBody,
    PostResponse
}