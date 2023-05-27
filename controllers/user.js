import { catchError } from "../middleware/errorHandler.js";
import User from '../models/user.js'
import { Order } from '../models/Order.js'

// For Showing the Profile Details
export const myProfile = (req, res, next) => {
    res.status(200).json({
        success: true,
        user: req.user
    })
}

// For Logout
export const Logout = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) return next(err);
        res.clearCookie("Google-Auth");
        res.status(200).json({
            message: "LOGGED OUT"
        })
    })
}

// Admin Users Details
export const getAdminUsers = catchError((async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json({
        success: true,
        message: "Got Admin Users Successfully",
        users
    })
}))

// For Getting DataStatistics to Admin Dashboard
export const getAdminStats = catchError((async (req, res, next) => {
    const userCount = await User.countDocuments();

    const orders = await Order.find({})

    const preparedOrders = orders.filter((i) => i.orderStatus === "Preparing");
    const shippedOrders = orders.filter((i) => i.orderStatus === "Shipped");
    const deliveredOrders = orders.filter((i) => i.orderStatus === "Delivered");

    let totalMoney = 0;

    orders.forEach((i) => {
        totalMoney += i.totalPrice;
    })

    res.status(200).json({
        success: true,
        userCount,
        orderCount: {
            total: orders.length,
            preparing: preparedOrders.length,
            shipped: shippedOrders.length,
            delivered: deliveredOrders.length
        },
        totalMoney
    })
}))