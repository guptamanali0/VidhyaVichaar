const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const questionsRouter = require('./routes/questions');


const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


// connect DB
connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/vidyavichara');


app.use('/api/questions', questionsRouter);


app.get('/', (req, res) => res.send('VidyaVichara API running'));
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));