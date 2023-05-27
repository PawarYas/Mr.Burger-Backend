import app from "./app.js";
import { connectToDB } from "./config/database.js";
import Razorpay from 'razorpay'

connectToDB()

// RazorPay Integration
export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
});


app.get("/", (req, res) => {
    res.send("<h1>Server says HELLO</h1>")
})
app.listen(process.env.PORT, () => {
    console.log(`Server Running on PORT:: ${process.env.PORT} & in ${process.env.NODE_ENV}mode`)
})