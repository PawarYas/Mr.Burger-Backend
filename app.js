import express from 'express'
import dotenv from 'dotenv'
import { connectPassport } from './utils/provider.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import UserRoute from './routes/Users.js'
import OrderRoute from './routes/Order.js'
import passport from 'passport';
import { errorHandler } from './middleware/errorHandler.js';
import cors from 'cors'


const app = express();

export default app;

dotenv.config({
    path: "./config/config.env"
})

// Middlewares
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    name: "Google-Auth",
    // cookie: {
    //     httpOnly: process.env.NODE_ENV === "development" ? false : true,
    //     secure: process.env.NODE_ENV === "development" ? false : true,
    //     sameSite: process.env.NODE_ENV === "development" ? false : 'none'
    // }
}));

app.use(cookieParser());
app.use(express.json());
app.use(
    // urlencoded({
    //     extended: true,
    // })
    express.urlencoded({
        extended: true
    })
)
app.enable("trust proxy")


//Validating Cors 
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"]
}))

app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());

connectPassport();



// User Routes
app.use('/api/v1', UserRoute);
app.use('/api/v1', OrderRoute);



// Error Middleware
app.use(errorHandler)