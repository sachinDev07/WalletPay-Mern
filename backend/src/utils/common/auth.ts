import jwt from "jsonwebtoken";

type InputType = {
  id: string;
  email: string;
};

interface JwtPayload {
  _id: string;
}

function createAccessToken(input: InputType) {
  try {
    return jwt.sign(input, process.env.ACCESS_SECRET_TOKEN as string, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY as string,
    });
  } catch (error) {
    throw error;
  }
}

function createRefreshToken(input: InputType) {
  try {
    return jwt.sign(input, process.env.REFRESH_SECRET_TOKEN as string, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY as string,
    });
  } catch (error) {
    throw error;
  }
}

function verifyToken(token: string): JwtPayload {
  try {
    return jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string,
    ) as JwtPayload;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { createAccessToken, createRefreshToken, verifyToken };
