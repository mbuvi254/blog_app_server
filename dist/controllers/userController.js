import client from "../config/database.js";
import {} from "express";
import { checkPasswordStrength, hashPassword } from "./passwordHelpers.js";
export const getUserProfile = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                status: "Error",
                message: "Unauthorized Access",
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
        return res.status(200).json(user);
    }
    catch (error) {
        console.error("Error fetching profile:", error);
        return res.status(500).json({
            status: "Error",
            message: "Something went wrong",
        });
    }
};
export const updateUserProfile = async (req, res) => {
    try {
        const { username, firstName, lastName, emailAddress } = req.body;
        const uId = req.user?.id;
        const userId = String(uId);
        if (!firstName || !lastName || !username || !emailAddress) {
            console.log("All fields required");
            return res.status(400).json({
                status: "Error",
                message: "All fields required",
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
        const emailInUse = await client.user.findFirst({
            where: { emailAddress, NOT: { id: userId } },
        });
        if (emailInUse) {
            console.log("Email already in use");
            return res.status(409).json({
                status: "Error",
                message: "Email already in use",
            });
        }
        const usernameInUse = await client.user.findFirst({
            where: { username, NOT: { id: userId } },
        });
        if (usernameInUse) {
            console.log("Username already in use");
            return res.status(409).json({
                status: "Error",
                message: "Username already in use",
            });
        }
        const updatedUser = await client.user.update({
            where: { id: userId },
            data: {
                firstName,
                lastName,
                emailAddress,
                username,
                lastUpdated: new Date(),
            },
        });
        console.log(`User profile updated ${updatedUser.username}`);
        return res.status(200).json({
            status: "Success",
            message: "User  Updated Successfully",
            user: updatedUser,
        });
    }
    catch (error) {
        console.error("Error occured during user update:", error);
        return res.status(500).json({
            status: "Error",
            message: "Something Went Wrong",
        });
    }
};
//# sourceMappingURL=userController.js.map