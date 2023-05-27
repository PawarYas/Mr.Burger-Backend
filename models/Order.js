import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        houseNo: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        pinCode: {
            type: Number,
            required: true
        },
        phoneNumber: {
            type: Number,
            required: true
        }
    },
    OrderItems: {
        alooTikkiBurger: {
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
        },
        vegCheeseBurger: {
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
        },
        chickenCheeseBurger: {
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
        },
        supremeVeggieBurger: {
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
        },
        lentilsMushroomsBurger: {
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
        },
        BbqChickenBurger: {
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
        }
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ["Cash On Delivery", "Online"],
        default: "Cash On Delivery"
    },
    paymentInfo: {
        type: mongoose.Schema.ObjectId,
        ref: "Payment"
    },
    paidAt: Date,

    itemsPrice: {
        type: Number,
        default: 0
    },
    taxPrice: {
        type: Number,
        default: 0
    },
    deliveryCharges: {
        type: Number,
        default: 0
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    orderStatus: {
        type: String,
        enum: ["Preparing,Shipped,Delivered"],
        default: "Preparing"
    },
    deliveredAt: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const Order = mongoose.model("Order", orderSchema)