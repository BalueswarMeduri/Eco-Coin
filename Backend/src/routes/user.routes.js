import { Router } from "express";
import {registerUser , loginUser , logoutUser , refreshAccesstoken , changeCurrentUserPassword , getCurrentUser
    , updateAccountDetails , forgetPassword , newPassword} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT ,logoutUser)
router.route("/refresh-token").post(refreshAccesstoken)
router.route("/current-user").get(verifyJWT , getCurrentUser)
router.route("/update-account").patch(verifyJWT , updateAccountDetails)
router.route("/change-password").post(verifyJWT , changeCurrentUserPassword)
router.route("/forget-password").patch(verifyJWT , forgetPassword)
router.route("/new-password").patch(verifyJWT , newPassword)

export default router;