'use server'

import connectToDB from "@/database"
import User from "@/models";
import bcrypt from 'bcryptjs';


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