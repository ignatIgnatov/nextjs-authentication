'use server'

import connectToDB from "@/database"
import User from "@/models";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";

export async function registerUser(formData) {
    await connectToDB();

    try {

        const { username, email, password } = formData;

        const checkUser = await User.findOne({ email });

        if (checkUser) {
            return {
                success: false,
                message: 'User already exists'
            }
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newlyCreatedUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newlyCreatedUser.save();

        if (savedUser) {
            return {
                success: true,
                data: JSON.parse(JSON.stringify(savedUser))
            }
        } else {
            return {
                success: false,
                message: 'Something went wrong! Please try again'
            }
        }

    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: 'Something went wrong! Please try again'
        }
    }
}

export async function loginUserAction(formData) {

    await connectToDB();

    try {

        const { email, password } = formData;

        const checkUser = await User.findOne({ email });

        if (!checkUser) {
            return {
                success: false,
                message: 'User with this email not exists'
            }
        }

        const checkPassword = await bcrypt.compare(password, checkUser.password);
        if (!checkPassword) {
            return {
                success: false,
                message: 'Incorrect password!'
            }
        }

        const createdTokenData = {
            id: checkUser._id,
            username: checkUser.username,
            email: checkUser.email
        }

        const token = jwt.sign(createdTokenData, "DEFAULT_KEY", { expiresIn: '1d' });

        const getCookies = cookies();
        getCookies.set('token', token);

        return {
            success: true,
            message: 'Login successfully'
        }

    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: 'Something went wrong! Please try again'
        }
    }

}


export async function fetchAuthUserAction() {

    await connectToDB();

    try {

        const getCookies = cookies();
        const token = getCookies.get('token')?.value || '';
        if (token === '') {
            return {
                success: false,
                message: 'Invalid token'
            }
        }

        const decodedToken = jwt.verify(token, 'DEFAULT_KEY');
        const getUserInfo = await User.findOne({ _id: decodedToken.id });

        if (getUserInfo) {
            return {
                success: true,
                data: JSON.parse(JSON.stringify(getUserInfo))
            }
        } else {
            return {
                success: false,
                message: 'Something went wrong! Please try again'
            }
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: 'Something went wrong! Please try again'
        }
    }
}


export async function logoutAction() {
    const getCookies = cookies();
    getCookies.set('token', '');
}