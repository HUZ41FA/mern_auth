import express from 'express';
import { authUser, registerNewUser, logoutUser, getUserProfile, updateUserProfile } from '../controllers/userController.js';

const router = express.Router();

router.post("/auth", authUser);
router.post("/", registerNewUser);
router.post("/logout", logoutUser);
router.get("/profile", getUserProfile);
router.put("/profile", updateUserProfile);

// OR

// router.route("/profile").get(getUserProfile).put(updateUserProfile)


export default router;