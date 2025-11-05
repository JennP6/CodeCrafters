import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import incidentRoutes from "./server/routes/incidentRoutes.js";
import userRoutes from "./server/routes/userRoutes.js";


const app = express();
const PORT = 3000;

// Enable CORS for all origins
app.use(cors());

app.use(bodyParser.json());

// Default Message
app.get('/', (req, res) => {
    res.send({ message: 'Welcome to Code Crafers App'});
});

mongoose.connect('mongodb://127.0.0.1:27017/Final_Project', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use('/api/users', userRoutes);
app.use('/api/incidents', incidentRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
