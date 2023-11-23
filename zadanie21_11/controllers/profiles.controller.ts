import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import { CreateProfileBody, UpdateProfileBody, ProfileResponse } from "../types/TProfile";

const prisma = new PrismaClient();

const parseId = (id: string) => {
    if (isNaN(parseInt(id))) {
        throw new Error("Id is not a number");
    }
    return parseInt(id);
};

const createProfileResponse = (profile: any): ProfileResponse => {
    return {
        id: profile.id,
        bio: profile.bio,
        userId: profile.userId,
    };
};

const getProfilesController = async (req: Request, res: Response<ProfileResponse[] | { error: string }>) => {
    try {
        const profiles = await prisma.profile.findMany();
        const profileResponse: ProfileResponse[] = profiles.map(createProfileResponse);
        res.json(profileResponse);
    } catch (error) {
        res.status(500).json({ error: "Błąd podczas pobierania profili." });
    }
};

const getProfileController = async (req: Request<{ id: string }>, res: Response<ProfileResponse | { error: string }>) => {
    const { id } = req.params;
    const parsedId = parseId(id);

    try {
        const profile = await prisma.profile.findUnique({
            where: {
                id: parsedId,
            },
        });

        if (profile) {
            const profileResponse: ProfileResponse = createProfileResponse(profile);
            res.json(profileResponse);
        } else {
            res.status(404).json({ error: `Profile with id ${id} not found` });
        }
    } catch (error) {
        res.status(500).json({ error: "An error occurred while retrieving the profile." });
    }
};

const createProfileController = async (req: Request<{}, {}, CreateProfileBody>, res: Response<ProfileResponse | { error: string }>) => {
    const { bio, userId } = req.body;

    try {
        const profile = await prisma.profile.create({
            data: {
                bio,
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });

        const profileResponse: ProfileResponse = createProfileResponse(profile);
        res.json(profileResponse);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while creating the profile." });
    }
};

const updateProfileController = async (req: Request<{ id: string }, {}, UpdateProfileBody>, res: Response<ProfileResponse | { error: string }>) => {
    const { id } = req.params;
    const { bio } = req.body;
    const parsedId = parseId(id);

    try {
        const existingProfile = await prisma.profile.findUnique({
            where: {
                id: parsedId,
            },
        });

        if (!existingProfile) {
            return res.status(404).json({ error: `Profile with id ${id} not found` });
        }

        const profile = await prisma.profile.update({
            where: {
                id: existingProfile.id,
            },
            data: {
                bio,
            },
        });

        const profileResponse: ProfileResponse = createProfileResponse(profile);
        res.json(profileResponse);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while updating the profile." });
    }
};

const deleteProfileController = async (req: Request<{ id: string }>, res: Response<{ message: string } | { error: string }>) => {
    const { id } = req.params;
    const parsedId = parseId(id);

    try {
        const existingProfile = await prisma.profile.findUnique({
            where: {
                id: parsedId,
            },
        });

        if (!existingProfile) {
            return res.status(404).json({ error: `Profile with id ${id} not found` });
        }

        await prisma.profile.delete({
            where: {
                id: existingProfile.id,
            },
        });

        res.json({ message: `Profile with id ${id} deleted` });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while deleting the profile." });
    }
};

export { getProfilesController, getProfileController, createProfileController, updateProfileController, deleteProfileController };
