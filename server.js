import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

    const userschema = new mongoose.Schema({
    name: String,
    email: String
});

const user= mongoose.model('User', userschema);

app.get('/', async (req, res) => {
    res.send("Backend running");
});

app.post('/add-users', async (req, res) => {
    const newUser = await user.create(req.body);
    res.json({message: "User added" ,user: newUser});
});

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});