import { hash } from "argon2";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import handleError from "@/app/helpers/handleError";
import generateToken from "@/app/helpers/generateToken";
import { userRegiterSchema } from "@/app/schema/user.schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = userRegiterSchema.parse(body);

    const isUserExist = await prisma.user.findUnique({
      where: {
        email: validatedData.email,
      },
    });

    if (isUserExist) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "USER_ALREADY_EXIST",
            message: "user already exist",
          },
        },
        { status: 400 },
      );
    }

    const hashedPassword = await hash(validatedData.password);

    const newUser = await prisma.user.create({
      data: {
        ...validatedData,
        password: hashedPassword,
      },
    });

    const token = generateToken(newUser?.id);

    return NextResponse.json({ ...newUser, token }, { status: 200 });
  } catch (error) {
    return handleError(error, "failed to create user");
  }
}

export async function GET(_: NextRequest) {
  try {
    const [users, count] = await prisma.$transaction([
      prisma.user.findMany({
        omit: {
          password: true,
        },
      }),

      prisma.user.count(),
    ]);

    return NextResponse.json({ items: users, total: count }, { status: 200 });
  } catch (error) {
    return handleError(error, "failed to get user");
  }
}
