import mongoose from "mongoose";
import { Plant } from "../models/plant.models.js";
import { User } from "../models/user.models.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js";
import { sendMail } from "../utils/sendMail.js";
import { uploadImageToImagga } from "../utils/uploadImageToImagga.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import fs from "fs"

export const uploadImage = asyncHandler(async (req,res) => {
    const userId = req.user._id;
    const {lat , long} = req.body

    let imageLocalPath = req.file.path;


    if(!lat || !long){
      fs.unlinkSync(imageLocalPath)
       throw new ApiError(400 , "lat , long is required")}
    

    if (!imageLocalPath) throw new ApiError(400, "Image needed");

    const exsistedPlant = await Plant.findOne({place : [lat , long]});

    if(exsistedPlant){ 
      fs.unlinkSync(imageLocalPath);
      throw new ApiError(400 , "plant has already registered or plant can't be accepted with a radius of 1 meter");
    }

    let response = await uploadImageToImagga(imageLocalPath);
    console.log(response);

    response = response?.result?.tags

    const termsToFind = ["plant", "herb"];

    let filteredObjects = response?.filter((item) => {
      return termsToFind.includes(item.tag.en.toLowerCase()) && item.confidence > 50;});

    if(!filteredObjects) throw new ApiError(401 , "sorry your image is not upto the level for acceptence");

    const cloudRes = await uploadOnCloudinary(imageLocalPath);

    const plantRes = await Plant.create({
      owner : userId ,
      place : [lat,long],
      imageUrl : cloudRes?.url || ""
    })

    const user = await User.findById(userId).select("-refreshToken -password -OTP");

    user.coins += 5;

    await user.save()

   res.status(200).json(new ApiResponse(200, {image : plantRes ,user : user } , "image accepted successfully"));

});

export const redeem = asyncHandler(async(req , res) => {
    const {points} = req.body ;
    const id = req.user._id;
  
    if(!points) throw new ApiError(400 , "points are required");
  
    const response = await User.findById(id).select("-refreshToken -password -OTP")
  
    if(response.coins < points) throw new ApiError(400 , "not sufficient coins");
  
    response.coins -= points;
  
    const updatedUser = await response.save()
  
    return res.status(200).json(new ApiResponse(200 , updatedUser , "coins redeemed successfully"));
});
  
export const uploadedImages = asyncHandler( async (req , res) => {
    const id = req.user._id;
  
    const response = await Plant.aggregate([
      {$match : { owner : new mongoose.Types.ObjectId(id)}},
      {$project : {
        imageUrl : 1 ,
        place : 1,
        createdAt : 1
      }}
    ])
  
    return res.status(200).json(new ApiResponse(200 , response , "fetched successfully"))
});

export const getCount = asyncHandler(async (req , res) => {

    const [plantCount , userCount] = await Promise.all([Plant.countDocuments(),User.countDocuments()])
  
    res.status(200).json(new ApiResponse(200 , {plantCount , userCount} , "counts fetched successfully"));
});

export const getLeaderboard = asyncHandler(async (req, res) => {
  const leaderboard = await User.aggregate([
    {
      $lookup: {
        from: "plants",
        localField: "_id",
        foreignField: "owner", 
        as: "plants", 
      },
    },
    {
      $addFields: {
        plantCount: { $size: "$plants" }, 
      },
    },
    {
      $project: {
        _id: 0,
        userName: 1,
        fullName: 1,
        createdAt : 1,
        plantCount: 1, 
      },
    },
    {
      $sort: { plantCount: -1 }, 
    },
  ]);

  res.status(200).json(new ApiResponse(200, leaderboard, "Leaderboard fetched successfully"));
});

