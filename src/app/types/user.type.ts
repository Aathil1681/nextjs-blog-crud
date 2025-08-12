import { z } from "zod";
import { User } from "@prisma/client";
import { UserSchema } from "../schema/user.schema";

export type UserInput = z.infer<typeof UserSchema>;

export type UserResponse = User & { token: string };
