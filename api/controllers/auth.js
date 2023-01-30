import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { createError } from './../utils/error.js';

// REGISTER
export const register = async (req, res, next) => {
    const { username, email, password, confirmPassword } = req.body
    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(400).json({ message: 'user already exists' });
        if (password !== confirmPassword) return res.status(400).json({ message: 'passwords do not match' });

        const hashedPassowrd = await bcrypt.hash(password, 12);

        const createdUser = await User.create({
            username: username,
            email: email,
            password: hashedPassowrd
        });

        const token = jwt.sign(
            {
                email: createdUser.email,
                id: createdUser._id,
            },
            process.env.JWT,
            { expiresIn: '30d' },
        );

        res.status(201).json({ ...createdUser._doc, token }) // bunuda front localstorage-da stringify edir
    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
}

// LOGIN
export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            return next(createError(400, "Wrong password or email :("))
        }

        const isValidPass = await bcrypt.compare(req.body.password, user.password);
        if (!isValidPass) {
            return next(createError(400, "Wrong password or email :("))
        }

        const token = jwt.sign(
            { id: user._id},
            process.env.JWT
        );

        const { password, ...otherDetails } = user._doc

        return res
            .cookie("access_token", token, { httpOnly: true }) //{ httpOnly: true } secureni artirir
            .status(200)
            .json({ ...otherDetails });

    } catch (err) {
        next(err)
    }
}
