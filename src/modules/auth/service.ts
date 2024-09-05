import { StatusCodes } from "http-status-codes";
import { LoginRequest, loginSchema } from "./model";
import { userRepository } from "./repository";
import { HttpException } from "../../response/exception";
import { compareSync } from "bcrypt";
import { JwtPayload } from "jsonwebtoken";
import * as jwt from "jsonwebtoken";
import { ENV } from "../../utils/secrets";
import { success } from "../../response/success";
import { Response } from "express";

export const authService = {
    login: async (req: LoginRequest, res: Response) => {
        req.body = loginSchema.parse(req.body);
        const user = await userRepository.findByEmail(req.body.email);

        if (!user) {
            throw new HttpException(
                "Account does not exist, please try again",
                StatusCodes.NOT_FOUND
            );
        }

        if (!user.is_verified) {
            throw new HttpException(
                "This account is not verified",
                StatusCodes.BAD_REQUEST
            );
        }

        if (!compareSync(req.body.password, user.password!)) {
            throw new HttpException(
                "Incorrect Password",
                StatusCodes.BAD_REQUEST
            );
        }

        const jwtPayload: JwtPayload = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            is_verified: user.is_verified,
            gender: user.gender,
            birth_date: user.birth_date,
        };

        const token = jwt.sign(jwtPayload, ENV.JWT_SECRET);

        res.status(StatusCodes.OK).json(
            success("Login Successed !", { user: jwtPayload, token })
        );
    },
};
