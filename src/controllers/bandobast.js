import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";


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


export async function join_bandobast(req, res, next) {
    try {
      console.log("Cookies: ", req.cookies); // Add this line to log cookies
      const token = req.cookies.dutyOfficerCookie;
      console.log("token", token);
      if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { bandobastId } = req.body;
      console.log("decoded", decoded);
      const dutyOfficerId = decoded.id;
      console.log("dutyOfficerId", dutyOfficerId);

      if (!bandobastId) {
        return res.status(400).json({ error: "bandobastId is required" });
      }
  
      const joinBandobast = await prisma.joinBandobast.create({
        data: {
          bandobastId,
          dutyOfficerId,
        },
      });
  
      return res.status(201).json({ joinBandobast });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }