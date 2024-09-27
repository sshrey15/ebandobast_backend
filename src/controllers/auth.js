import { PrismaClient } from "@prisma/client";
import bcrypt, { compare } from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();



export async function login_admin(req, res, next) {
    try {
      console.log("Request body:", req.body); // Add this line to log the request body
  
      const { phone, batchId, rank } = req.body;
        
      if (!phone || !batchId || !rank) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      const existing_admin = await prisma.admin.findUnique({
        where: { phone },
      });
  
      console.log("existing_admin", existing_admin);
      if (!existing_admin) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
  
       // Direct comparison for phone
    if (phone !== existing_admin.phone) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
  
  
      try {
        if (!process.env.JWT_SECRET) {
          throw new Error("JWT_SECRET is missing");
        }
  
        const token = jwt.sign(
          {
            id: existing_admin.id,
            phone: existing_admin.phone,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );
        console.log("admin_token", token);
        res.cookie("adminCookie", token, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 86400000,
        });
  
        const response = res.status(200).json({ token });
        console.log("response", response);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }


  export async function login_dutyofficer(req, res, next) {
    try {
      console.log("Request body:", req.body); // Add this line to log the request body
  
      const { phone, batchId, rank } = req.body;
        
      if (!phone || !batchId || !rank) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      const existing_dutyOfficer = await prisma.dutyOfficer.findUnique({
        where: { phone },
      });
  
      console.log("existing_admin", existing_dutyOfficer);
      if (!existing_dutyOfficer) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
  
       // Direct comparison for phone
    if (phone !== existing_dutyOfficer.phone) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
  
  
      try {
        if (!process.env.JWT_SECRET) {
          throw new Error("JWT_SECRET is missing");
        }
  
        const token = jwt.sign(
          {
            id: existing_dutyOfficer.id,
            phone: existing_dutyOfficer.phone,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );
        console.log("dutyOfficer_cookie", token);
        res.cookie("dutyOfficerCookie", token, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 86400000,
        });
  
        const response = res.status(200).json({ token });
        console.log("response", response);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  export async function get_admin(req, res, next) {
    try {
      const admins = await prisma.admin.findMany();
      return res.status(200).json({ admins });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  
  export async function get_dutyofficer(req, res, next) {
    try {
      const dutyOfficers = await prisma.dutyOfficer.findMany();
      return res.status(200).json({ dutyOfficers });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  


  

  

