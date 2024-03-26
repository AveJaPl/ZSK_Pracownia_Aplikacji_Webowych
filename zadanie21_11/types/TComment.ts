type CreateCommentBody = {
    content: string;
    postId: number;
};

type UpdateCommentBody = {
    content: string;
    postId: number;
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