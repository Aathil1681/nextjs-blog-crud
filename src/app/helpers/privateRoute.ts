import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export default async function privateRoute(
  _req: any,
  cb: (user: { id: string }, token: string) => Promise<NextResponse>,
) {
  try {
    const authorization = (await headers()).get("Authorization");
    let token = authorization?.split("Bearer ")[1];

    // If no token in header, try cookie
    if (!token) {
      token = (await cookies()).get("USER_TOKEN")?.value;
    }

    if (!token) {
      return NextResponse.json(
        { code: "user-not-authorized", message: "you are not authorized" },
        { status: 401 },
      );
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    // Use your existing verify/decode functions
    jwt.verify(token, process.env.JWT_SECRET);
    const decodedToken = jwt.decode(token) as JwtPayload & { id: string };

    return cb(decodedToken, token);
  } catch (error) {
    const err = error as any;

    if (err.name === "JsonWebTokenError") {
      return NextResponse.json(
        {
          code: "invalid-token",
          message: "The token you provided is not valid.",
        },
        { status: 401 },
      );
    }
    if (err.name === "TokenExpiredError") {
      return NextResponse.json(
        {
          code: "token-expired",
          message: "The token you provided has expired.",
        },
        { status: 401 },
      );
    }
    throw error;
  }
}
