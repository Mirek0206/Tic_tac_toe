import express from "express";
import cors from "cors";
import { StreamChat } from "stream-chat";
import bcrypt from "bcrypt";
import mongoose from 'mongoose';

const app = express();

app.use(cors());
app.use(express.json());

// Połączenie z MongoDB
mongoose.connect('mongodb://mongo:27017/tictactoe', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error(err));

// Schemat i model użytkownika
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  hashedPassword: String,
});
const User = mongoose.model('User', userSchema);

const api_key = "ds3ekagfxmwf";
const api_secret = "rxze9tn2ackfgpqffathvarq8tctpkq7c6svtp64mqkqqreudmuzf4qr9ar2bpjz";
const serverClient = StreamChat.getInstance(api_key, api_secret);

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tworzenie nowego użytkownika w MongoDB
    const newUser = new User({ firstName, lastName, username, hashedPassword });
    await newUser.save();

    const token = serverClient.createToken(newUser._id.toString());
    res.json({ token, userId: newUser._id.toString(), firstName, lastName, username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.toString() });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) return res.json({ message: "User not found" });

    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
    if (passwordMatch) {
      const token = serverClient.createToken(newUser._id.toString());
      res.json({
        token,
        firstName: user.firstName,
        lastName: user.lastName,
        username,
        userId: user._id.toString(),
      });
    } else {
      res.json({ message: "Password does not match" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.toString() });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
