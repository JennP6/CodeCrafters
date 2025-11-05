import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';


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

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
