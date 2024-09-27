import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function create_alertInfo(req,res,next){
    try{
        const {description, imgURL, location, bandobastId, patrolId} = req.body;
        if(!description || !location || !bandobastId || !patrolId){
            return res.status(400).json({error:"All fields are required"});
        }

        const alertInfo = await prisma.alertInfo.create({
            data:{
                description,
                imgURL,
                location,
                bandobastId,
                patrolId
            }
        })

        return res.status(201).json({alertInfo});
    }catch(err){
        console.log(err);
        return res.status(500).json({error:"Internal Server Error"});
    }
}


export async function get_alertInfo(req,res,next){
    try{
        const alertInfo = await prisma.alertInfo.findMany();
        return res.status(200).json({alertInfo});
    }catch(err){
        console.log(err);
        console.log("Internal Server Error");
        return res.status(500).json({error:"Internal Server Error"});
    }
}