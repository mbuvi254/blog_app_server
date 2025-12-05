import client from "../config/database.js";
import {} from "express";
import { hashPassword, checkPasswordStrength, comparePassword, } from "./passwordHelpers.js";
import { generateToken } from "../utils/jwt.js";
//New User Registration Function
export const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, emailAddress, username, password } = req.body;
        if (!firstName || !lastName || !emailAddress || !username || !password) {
            console.log("All fields required");
            return res.status(400).json({
                status: "Error",
                message: "All fields are required",
            });
        }
        //I check if email exists in db
        const existingEmail = await client.user.findUnique({
            where: { emailAddress },
        });
        if (existingEmail) {
            console.log("User already registered");
            return res.status(400).json({
                status: "Error",
                message: "User email already registered",
            });
        }
        const existingUsername = await client.user.findUnique({
            where: { username },
        });
        if (existingUsername) {
            console.log("Username already taken");
            return res.status(400).json({
                status: "Error",
                message: "User Username already taken",
            });
        }
        //Check how strong user's password is
        const passwordStrength = await checkPasswordStrength(password);
        if (!passwordStrength || passwordStrength.score < 3) {
            return res.status(400).json({
                status: "Error",
                message: "Please select a stronger password",
            });
        }
        const hashedPassword = await hashPassword(password);
        const newUser = await client.user.create({
            data: {
                username,
                firstName,
                lastName,
                emailAddress,
                password: hashedPassword,
            },
        });
        console.log(`User registed ${newUser.username}`);
        return res.status(201).json({
            status: "Success",
            message: "User Registered Successfully",
            data: {
                id: newUser.id,
                username: newUser.username,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.emailAddress,
                isDeleted: newUser.isDeleted,
            },
        });
    }
    catch (error) {
        console.error("Error occured during user regitration:", error);
        return res.status(500).json({
            status: "Error",
            message: "Something Went Wrong",
        });
    }
};
//Login User
export const loginUser = async (req, res) => {
    try {
        const { emailAddress, username, password } = req.body;
        const identifier = emailAddress ?? username;
        if (!identifier || !password) {
            console.log("All fields required");
            return res.status(400).json({
                status: "Error",
                message: "Something Went Wrong",
            });
        }
        //const inputPassword= await hashPassword(password);
        //Get User Data
        const user = await client.user.findFirst({
            where: {
                OR: [{ username: identifier }, { emailAddress: identifier }],
            },
        });
        if (!user) {
            console.log("User data not loaded");
            return res.status(404).json({ message: "User not found" });
        }
        // user password
        const dbPassword = user.password;
        //Validate Password
        const validityPassword = await comparePassword(password, dbPassword);
        if (validityPassword) {
            const accessToken = generateToken(user.id, user.username);
            if (!accessToken) {
                return res.status(500).json({
                    status: "Error",
                    message: "Token generation failed",
                });
            }
            //Set Cookie for access token
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                //secure:true for production
                secure: process.env.NODE_ENV === "production",
                // sameSite:"strict",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                maxAge: 24 * 60 * 60 * 1000, //1 day
            });
            console.log("Login Successful");
            return res.status(200).json({
                status: "Success",
                message: "Login Successful",
                data: {
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    emailAddress: user.emailAddress,
                    isDeleted: user.isDeleted,
                    dateJoined: user.dateJoined,
                    lastUpdated: user.lastUpdated,
                },
                //accessToken: accessToken,
            });
        }
        else {
            return res.status(401).json("Wrong Password or Username");
        }
    }
    catch (error) {
        console.error("Login Failed:", error);
        return res.status(500).json({
            status: "Error",
            message: "Something went wrong",
        });
    }
};
//Logoout and clear cookie
export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("accessToken", {
            httpOnly: true,
            //secure:true for production
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        console.log("Logout Successful");
        return res.status(200).json({
            status: "Success",
            message: "Logout Successful",
        });
    }
    catch (error) {
        console.error("Logout Failed:", error);
        return res.status(500).json({
            status: "Error",
            message: "Something went wrong",
        });
    }
};
export const updateUserPassword = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { currentPassword, newPassword } = req.body;
        if (!userId) {
            return res.status(401).json({
                status: "Error",
                message: "User not authenticated",
            });
        }
        if (!currentPassword || !newPassword) {
            console.log("All fields required");
            return res.status(400).json({
                status: "Error",
                message: "All fields are required",
            });
        }
        //I check if email exists in db
        const existingUser = await client.user.findUnique({
            where: { id: userId },
        });
        if (!existingUser) {
            console.log("User does not exist");
            return res.status(404).json({
                status: "Error",
                message: "User Does not exist",
            });
        }
        //Check current password
        const dbPassword = existingUser.password;
        const validityPassword = await comparePassword(currentPassword, dbPassword);
        if (!validityPassword) {
            return res.status(401).json({
                status: "Error",
                message: "Incorrect Current Password",
            });
        }
        //Ensure password not reused
        const samePassword = await comparePassword(newPassword, existingUser.password);
        if (samePassword) {
            return res.status(400).json({
                status: "Error",
                message: "New password cannot be the same as the old password",
            });
        }
        //Check how strong user's password is
        const passwordStrength = await checkPasswordStrength(newPassword);
        if (!passwordStrength || passwordStrength.score < 3) {
            return res.status(400).json({
                status: "Error",
                message: "Please select a stronger password",
            });
        }
        const hashedPassword = await hashPassword(newPassword);
        const updatedPassword = await client.user.update({
            where: { id: userId },
            data: { password: hashedPassword, lastUpdated: new Date() },
            select: {
                id: true,
                username: true,
                firstName: true,
                lastName: true,
                emailAddress: true,
                isDeleted: true,
                dateJoined: true,
                lastUpdated: true,
            },
        });
        console.log(`User password updated ${updatedPassword.username}`);
        return res.status(200).json({
            status: "Success",
            message: "User Password Updated Successfully",
            data: updatedPassword,
        });
    }
    catch (error) {
        console.log("Error occured during user password update:", error);
        return res.status(500).json({
            status: "Error",
            message: "Something Went Wrong",
        });
    }
};
export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                status: "Error",
                message: "User not authenticated",
            });
        }
        const user = await client.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                username: true,
                firstName: true,
                lastName: true,
                emailAddress: true,
                isDeleted: true,
                dateJoined: true,
                lastUpdated: true,
            },
        });
        if (!user) {
            return res.status(404).json({
                status: "Error",
                message: "User not found",
            });
        }
        return res.status(200).json({
            status: "Success",
            message: "User fetched successfully",
            data: user,
        });
    }
    catch (error) {
        console.error("Fetch current user failed:", error);
        return res.status(500).json({
            status: "Error",
            message: "Something went wrong",
        });
    }
};
//# sourceMappingURL=authController.js.map