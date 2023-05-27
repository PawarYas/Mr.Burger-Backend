import express from 'express';
import passport from 'passport';
import { Logout, getAdminStats, getAdminUsers, myProfile } from '../controllers/user.js';
import { isAuthenticated, isAuthenticatedAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get("/google-auth", passport.authenticate("google", { scope: ["profile"] }));

// After Login Redirect to Frontend
router.get("/login",
    passport.authenticate("google", {
        successRedirect: process.env.FRONTEND_URL
    }),
    // (req, res, next) => {
    //     res.send("<h1>Logged In Successfully</h1>")
    // }
);

// {
//     scope: ["profile"],
//     successRedirect: process.env.FRONTEND_URL
// }


// for Getting Profile Details
router.get("/me", isAuthenticated, myProfile)

// For Logout from App
router.get("/logout", Logout)

// For Getting Admin 
router.get("/admin/users", isAuthenticated, isAuthenticatedAdmin, getAdminUsers)

router.get("/admin/stats", isAuthenticated, isAuthenticatedAdmin, getAdminStats)

export default router;