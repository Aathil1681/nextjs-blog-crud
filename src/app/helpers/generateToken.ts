import jwt from "jsonwebtoken";

export default function generateToken(id: string) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not set");
  }

  try {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    return token;
  } catch {
    throw {
      code: "error-generating-jwt",
      message: "failed to generate token",
    };
  }
}
