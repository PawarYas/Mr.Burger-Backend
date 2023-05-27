// Middleware for Authenticate (users)
import HandleError from "../utils/handleError.js";

export const isAuthenticated = (req, res, next) => {
    const token = req.cookies["Google-Auth"];
    console.log("TOKEN::", token);

    if (!token) {
        return next(new HandleError("Not Logged In", 401));
    }
    next();
}


// Middleware for Authenticate (admin)
export const isAuthenticatedAdmin = (req, res, next) => {

    if (req.user.role !== "admin") {
        return next(new HandleError("Sorry for the Inconvenience!! Only Admin Allowed", 401));
    }
    next();
}