type CreateCommentBody = {
    content: string;
    postId: number;
};

type UpdateCommentBody = {
    content: string;
};

type CommentResponse = {
    id: number;
    content: string;
    postId: number;
};


export {
    CreateCommentBody,
    UpdateCommentBody,
    CommentResponse
}