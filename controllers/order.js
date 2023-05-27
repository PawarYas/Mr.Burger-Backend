import { catchError, errorHandler } from "../middleware/errorHandler.js";
import { Order } from "../models/Order.js";
import { instance } from '../server.js'
import crypto from 'crypto'
import { Payment } from '../models/payement.js'
// For Placing a Order
export const createOrder = catchError(async (req, res, next) => {
    const { shippingInfo, OrderItems, paymentMethod, paymentInfo, itemsPrice, taxPrice, deliveryCharges, totalPrice } = req.body;

    const user = req.user._id;

    const orderOptions = {
        shippingInfo, OrderItems, paymentMethod, paymentInfo, itemsPrice, taxPrice, deliveryCharges, totalPrice, user
    }

    await Order.create(orderOptions);

    res.status(200).json({
        success: true,
        message: "Order Placed Successfully via Cash On Delivery"
    })
})

// Placing Order Online
export const createOrderOnline = catchError(async (req, res, next) => {
    const { shippingInfo, OrderItems, paymentMethod, paymentInfo, itemsPrice, taxPrice, deliveryCharges, totalPrice } = req.body;

    const user = req.user._id;

    const orderOptions = {
        shippingInfo, OrderItems, paymentMethod, paymentInfo, itemsPrice, taxPrice, deliveryCharges, totalPrice, user
    }

    const options = {
        amount: Number(totalPrice) * 100,  // amount in the smallest currency unit
        currency: "INR",
    };
    instance.orders.create(options, function (err, order) {
        // console.log(order);
    });

    const onlineOrder = await instance.orders.create(options);

    res.status(200).json({
        success: true,
        message: "Order Placed Successfully via Online Payment",
        onlineOrder,
        orderOptions
    })
})


// For Verified Payment
export const paymentVerification = catchError(async (req, res, next) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, orderOptions } = req.body;

    const data = razorpay_order_id + "|" + razorpay_payment_id;
    const sign = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET_KEY).update(data).digest("hex")


    if (razorpay_signature === sign) {
        const payment = await Payment.create({
            razorPay_payment_id: razorpay_order_id,
            razorPay_order_id: razorpay_order_id,
            razorPay_signature: razorpay_signature
        })

        await Order.create({
            ...orderOptions, paidAt: new Date(Date.now()), paymentInfo: payment._id
        })

        res.status(200).json({
            success: true,
            message: `Order Placed Successfully with Payment Id:${payment._id}`
        })
    } else {
        return next(new errorHandler("Payment Failed", 400))
    }
})

// For Getting All Orders Details 
export const myOrders = catchError(async (req, res, next) => {
    const orders = await Order.findById({
        user: req.user._id
    }).populate("user", "name")

    res.status(200).json({
        success: true,
        message: "MyOrder Data Received",
        orders
    })
})


// for Getting a particular Ordered Details
export const getOrderDetails = catchError(async (req, res, next) => {
    const order = await Order.findById({
        user: req.params.id
    }).populate("user", "name")

    if (!order) {
        return next(new errorHandler("Invalid Order ID", 404))
    }
    else {
        res.status(201).json({
            success: true,
            message: "Particular Order Data Received",
            order
        })
    }
})

// For Getting all orders by Admin
export const getAdminOrders = catchError(async (req, res, next) => {
    const order = await Order.find({}).populate("user", "name")

    if (!order) {
        return next(new errorHandler("No Orders Yet!!", 404))
    }
    else {
        res.status(201).json({
            success: true,
            message: "Admin All Orders Data Received",
            order
        })
    }
})

// For Getting Order Status Details and Change It
export const processOrders = catchError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order)
        return next(new errorHandler("Invalid Order ID(Admin)", 404))

    if (order.orderStatus === "Preparing") {
        order.orderStatus === "Shipped";
    }
    else if (order.orderStatus === "Shipped") {
        order.orderStatus === "Delivered";
        order.orderStatus === new Date(Date.now());
    }
    else if (order.orderStatus === "Delivered") {
        return next(new errorHandler("Items Already Delivered", 400))
    }

    await order.save();

    res.status(200).json({
        success: true,
        message: "Status Updated Successfully",
    })
})