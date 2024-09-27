import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



export async function create_bandobast(req,res,next){
    try{
        console.log("Request body:", req.body);

        const {name, date, location, description} = req.body;
        if(!name || !date || !location || !description){
            return res.status(400).json({error:"All fields are required"});
        }
        const bandobast = await prisma.bandobast.create({
            data:{
                name,
                date: new Date(date),
                location,
                description,
            }
        })


        return res.status(201).json({bandobast});
    }catch(err){
        console.log(err);
        return res.status(500).json({error:"Internal Server Error"});
    }
}


export async function get_bandobast(req,res,next){
    try{
        const bandobast = await prisma.bandobast.findMany();
        return res.status(200).json({bandobast});
    }catch(err){
        console.log(err);
        console.log("Internal Server Error");
        return res.status(500).json({error:"Internal Server Error"});
    }
}


