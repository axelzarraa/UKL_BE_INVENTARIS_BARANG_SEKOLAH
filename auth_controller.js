import md5 from "md5";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const secretKey = "cuaks";

export const authenticate = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const userCek = await prisma.user.findFirst({
        where: {
          username: username,
          password: md5(password),
        },
      });
      if (userCek) {
        const payload = JSON.stringify(userCek);
        const token = jwt.sign(payload, secretKey);
        res.status(200).json({
          status: "succes",
          message: "login berhasil",
          token: token,
          loggedin: userCek.username,
        });
      } else {
        res.status(404).json({
          succes: false,
          logged: false,
          message: "username or password invalid",
        });
      }
    } catch (error) {
      console.log("cek");
      console.log(error);
      res.status(500).json({
        message: error.message,
      });
    }
  };
  

  export const authorize = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        console.log("Authorization Header:", authHeader);

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authorization header is missing",
            });
        }

        const parts = authHeader.split(" ");
        if (parts.length !== 2 || parts[0] !== "Bearer") {
            return res.status(400).json({
                success: false,
                message: "Invalid authorization format. Expected 'Bearer <token>'",
            });
        }

        const token = parts[1];
        const verifiedUser = jwt.verify(token, secretKey);

        if (!verifiedUser) {
            return res.status(403).json({
                success: false,
                message: "Invalid or expired token",
            });
        }

        req.user = verifiedUser;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

  