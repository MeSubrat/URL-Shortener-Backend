const express = require('express')
const dotenv = require('dotenv')
dotenv.config();
const connectDb = require('./config/dbconfig');
const urlRoutes = require('./Routes/url.routes');
const authRoutes = require('./Routes/auth.routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
    origin: [
        'http://localhost:5173',
        'https://url-shortener-frontend-ghaagmvhp.vercel.app'
    ],
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}


app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDb();
app.get('/', (req, res) => {
    res.send("Server is working.")  
})

app.use(urlRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
})