import jwt from "jsonwebtoken";

type InputType = {
  id: string;
  email: string;
};

export interface JwtPayload {
  id: string;
  email: string;
}

function createToken(input: InputType) {
  try {
    return jwt.sign(input, process.env.JWT_SECRET_KEY as string, {
      expiresIn: process.env.JWT_EXPIRY as string,
    });
  } catch (error) {
    throw error;
  }
}

function verifyToken(token: string): JwtPayload {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export {
  createToken,
  verifyToken,
}