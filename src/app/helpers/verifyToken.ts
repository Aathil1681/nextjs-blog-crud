import jwt from "jsonwebtoken";

export default function verifyToken(token: string) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not set");
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    const err = error as any;
    console.log({ name: err.name });

    if (err.name === "JsonWebTokenError") {
      throw {
        code: "invalid-token",
        message: "The token you provided is not valid.",
      };
    }
    if (err.name === "TokenExpiredError") {
      throw {
        code: "token-expired",
        message: "The token you provided has been expired.",
      };
    }
    throw { message: "failed" };
  }
}
