type CreateCategoryBody = {
    name: string;
};

type UpdateCategoryBody = {
    name: string;
};

type CategoryResponse = {
    id: number;
    name: string;
};

export {
    CreateCategoryBody,
    UpdateCategoryBody,
    CategoryResponse
}