const express = require('express')
const dotenv = require('dotenv')
dotenv.config();
const connectDb = require('./config/dbconfig');
const urlRoutes = require('./Routes/url.routes');
const authRoutes = require('./Routes/auth.routes');
const cors = require('cors');

const app = express();
const PORT = 3000;
corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    optionsSuccessStatus: 200,
    credential: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    method: ['GET', 'POST', 'PUT', 'DELETE'],
}


app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDb();
app.get('/', (req, res) => {
    res.send("Server is working.")
})

app.use(urlRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
})