type CreateProfileBody = {
    bio: string;
    userId: number;
};

type UpdateProfileBody = {
    bio: string;
};

type ProfileResponse = {
    id: number;
    bio: string;
    userId: number;
};

export {
    CreateProfileBody,
    UpdateProfileBody,
    ProfileResponse
}