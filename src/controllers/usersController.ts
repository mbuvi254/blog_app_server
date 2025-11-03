// userControllers.ts
import client from "../config/database.js";
import express, { type Request, type Response } from "express";


export const getAllUsers = async (req:Request,res:Response)=>{
    try{
        const users = await client.user.findMany();
        console.log(users)
        return res.status(200).json(users)
    }catch(error){
        console.error("Error occured during fetching users:",error)
        return res.status(500).json({ message:"Something Went Wrong" });
    
    }
}

export const getUser = async (req:Request,res:Response)=>{
    try{
        const {id} =req.params;

        const userId = String(id);

        const user = await client.user.findUnique({
            where :{ id : userId}
        });
        if(!user){
            console.log("No user found");
            return res.status(404).json("User not Found")
        }
        return res.status(200).json(user);
    }catch(error){
        console.error("Database Error:",error);
        return res.status(500).json({message:"Something Went Wrong"})
    };
};


export const updateUser = async (req:Request, res:Response)=>{
    try{
        const{id}=req.params;
        const {username,firstName,lastName}=req.body;
        const userId = String(id);

        if(!username || ! firstName || ! lastName ){
            console.log("All fields required");
            return res.status(400).json({message:"Something Went Wrong"})
        }
        
        const updatedUser  = await client.user.update({
            where :{id:userId},
            data : {username,firstName,lastName}
        });
        console.log(`User updated ${updatedUser.username}`)
        return res.status(200).json({
            message: "User Updated Successfully",
            user: updatedUser
        });
        
    }catch(error){
        console.error("Error occured during user update:",error)
        return res.status(500).json({
            message:"Something Went Wrong"
        });
        
    }
   
}

export const deleteUser = async (req:Request,res:Response)=>{
    try{
        const {id} =req.params;

        const userId = String(id);
        const deletedUser = await client.user.delete({
            where :{ id : userId}

        });
        if(!deletedUser){
            console.log("Error deleting User");
            return res.status(404).json("User not Found")
        }
        return res.status(200).json("User deleted successfully");
    }catch(error){
        console.error("Database Error:",error);
        return res.status(500).json({message:"Something Went Wrong"})
    };
};






