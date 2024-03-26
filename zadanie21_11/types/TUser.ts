type CreateUserBody = {
    email: string;
    bio?: string;
}

type UpdateUserBody = {
    email: string;
    bio?: string;
}

type UserResponse = {
    id: number;
    email: string;
    bio?: string;
}

export {
    CreateUserBody,
    UpdateUserBody,
    UserResponse
}