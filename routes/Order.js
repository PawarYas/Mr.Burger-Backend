import express from 'express';
import { isAuthenticated, isAuthenticatedAdmin } from '../middleware/auth.js';
import { createOrder, createOrderOnline, getAdminOrders, getOrderDetails, myOrders, paymentVerification, processOrders } from '../controllers/order.js';

const router = express.Router();


// For Users
router.post("/create-order", isAuthenticated, createOrder);

router.post("/online-order", isAuthenticated, createOrderOnline);

router.post("/payment-verification", isAuthenticated, paymentVerification);

router.get("/myOrder", isAuthenticated, myOrders);

router.get("order/:id", isAuthenticated, getOrderDetails);


// For Admin
router.get("admin/orders", isAuthenticatedAdmin, getAdminOrders);

router.get("admin/order/:id", isAuthenticatedAdmin, processOrders);

export default router;