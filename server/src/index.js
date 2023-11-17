import express from "express";
import cors from "cors";
import {StreamChat} from "stream-chat";
import {v4 as uuidv4} from "uuid";
import bcrypt from "bcrypt"

const app = express();

app.use(cors());
app.use(express.json());
const api_key = "ds3ekagfxmwf";
const api_secret = "rxze9tn2ackfgpqffathvarq8tctpkq7c6svtp64mqkqqreudmuzf4qr9ar2bpjz";
const serverClient = new StreamChat.getInstance(api_key,api_secret);

app.post("/signup", async (req, res) => {
    try {
        const {firstName, lastName, username, password} = req.body;
        const userId = uuidv4();
        const hashedPassword = bcrypt.hash(password, 10);
        const token = serverClient.createToken(userId);
        res.json({token, userId, firstName, lastName, username, hashedPassword})
    } catch (error) {
        res.json(error);
    }    
    });

app.post("/login");

app.listen(3001, () => {
    console.log("Server is running on port 3001");
})