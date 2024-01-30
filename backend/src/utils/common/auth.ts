import jwt from "jsonwebtoken";

type InputType = {
    id: string;
    email: string
}

function createToken(input: InputType) {
    try {
        return jwt.sign(input, process.env.JWT_SECRET_KEY as string, { expiresIn: process.env.JWT_EXPIRY as string})
    } catch (error) {
        throw error;
    }
}

export {
    createToken,
}