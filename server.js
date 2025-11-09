import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import incidentRoutes from "./server/routes/incidentRoutes.js";
import userRoutes from "./server/routes/userRoutes.js";
import authRoutes from './server/routes/authRoutes.js';


const app = express();
const PORT = 3000;

// Enable CORS for all origins
app.use(cors());

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/incidents', incidentRoutes);

// Default Message
app.get('/', (req, res) => {
    res.send({ message: 'Welcome to Code Crafters App'});
});

mongoose.connect('mongodb://127.0.0.1:27017/Final_Project', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
