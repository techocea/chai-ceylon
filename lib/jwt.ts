import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export function signToken(payload: any) {
  return jwt.sign(payload, SECRET, { expiresIn: "1d" });
}

export function verifyToken(token: any) {
  return jwt.verify(token, SECRET);
}

export function getUserFromToken(token: string) {
  try {
    const decoded = jwt.verify(token, SECRET);
    return decoded as { _id: string; email: string };
  } catch (error) {
    console.error("cannot get user from token:", error);
    return null;
  }
}
