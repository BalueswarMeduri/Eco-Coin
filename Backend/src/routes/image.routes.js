import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";
import { uploadImage , redeem , getCount , uploadedImages ,getLeaderboard} from "../controllers/image.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()
router.route("/get-count").get(getCount)
router.use(verifyJWT)

router.route("/upload-image").post(upload.single("image") , uploadImage)
router.route("/redeem").patch(redeem)
router.route("/uploaded-images").get(uploadedImages)
router.route("/get-leaderboard").get(getLeaderboard)

export default router
