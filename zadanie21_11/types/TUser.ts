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
    profile: {
        id: number;
        bio: string;
    } | null
}

export {
    CreateUserBody,
    UpdateUserBody,
    UserResponse
}