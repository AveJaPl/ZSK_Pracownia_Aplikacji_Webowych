import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import { CreateUserBody, UpdateUserBody, UserResponse } from "../types/TUser";

const prisma = new PrismaClient();

const parseId = (id: string) => {
  if (isNaN(parseInt(id))) {
    throw new Error("Id is not a number");
  }
  return parseInt(id);
};

const createUserResponse = (user: any): UserResponse => {
    return {
        id: user.id,
        email: user.email,
        bio: user.profile?.bio || null,
    };
    };

const getUsersController = async (
  req: Request,
  res: Response<UserResponse[] | { error: string }>
) => {
  try {
    const users = await prisma.user.findMany({ include: { profile: true } });
    const userResponse: UserResponse[] = users.map(createUserResponse)

    res.json(userResponse);
  } catch (error) {
    res.status(500).json({ error: "Błąd podczas pobierania użytkowników." });
  }
};
const getUserController = async (
  req: Request<{ id: string }>,
  res: Response<UserResponse | { error: string }>
) => {
  const { id } = req.params;
  const parsedId = parseId(id);

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parsedId,
      },
      include: {
        profile: true,
      },
    });
    if (user) {
      const userResponse: UserResponse = createUserResponse(user);
      res.json(userResponse);
    } else {
      res.status(404).json({ error: `User with id ${id} not found` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the user." });
  }
};

const createUserController = async (
  req: Request<{}, {}, CreateUserBody>,
  res: Response<UserResponse | { error: string }>
) => {
  const { email, bio } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        email,
        profile: bio
          ? {
              create: {
                bio,
              },
            }
          : undefined,
      },
      include: {
        profile: true,
      },
    });
    const userResponse: UserResponse = createUserResponse(user);

    res.json(userResponse);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the user." });
  }
};

const updateUserController = async (
  req: Request<{ id: string }, {}, UpdateUserBody>,
  res: Response<UserResponse | { error: string }>
) => {
  const { id } = req.params;
  const { email, bio } = req.body;
  const parsedId = parseId(id);

  try {

    const existingUser = await prisma.user.findUnique({
        where: {
            id: parsedId,
        },
        });
    if (!existingUser) {
        return res.status(404).json({ error: `User with id ${id} not found` });
    }

    const user = await prisma.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        email,
        profile: {
          update: {
            bio,
          },
        },
      },
      include: {
        profile: true,
      },
    });
    const userResponse: UserResponse = createUserResponse(user);
    res.json(userResponse);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the user." });
  }
};

const deleteUserController = async (
  req: Request<{ id: string }>,
  res: Response<{ message: string } | { error: string }>
) => {
  const { id } = req.params;
    const parsedId = parseId(id);
  try {

    const existingUser = await prisma.user.findUnique({
        where: {
            id: parsedId,
        },
        });
    if (!existingUser) {
        return res.status(404).json({ error: `User with id ${id} not found` });
    }

    await prisma.user.delete({
      where: {
        id: existingUser.id,
      },
    });
    res.json({ message: `User with id ${id} deleted` });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the user." });
  }
};

export {
  getUsersController,
  getUserController,
  createUserController,
  updateUserController,
  deleteUserController,
};
