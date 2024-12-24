import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import gameController from "../controllers/gameController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/signup', homeController.getSignUpPage);
    router.post('/api/signup', userController.handleSignUp);
    router.get('/signin', homeController.getSignInPage);
    router.post('/api/signin', userController.handleSignIn);

    // User management routes
    router.get('/api/users', userController.getAllUsers);
    router.put('/api/users/ban/:id', userController.banUser);
    router.delete('/api/users/:id', userController.deleteUser);

    // Game management routes
    router.get('/api/games', gameController.getAllGames); // Add the new route

    return app.use("/", router);
}

module.exports = initWebRoutes;