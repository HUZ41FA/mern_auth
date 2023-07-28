import express from 'express';
import { authUser, registerNewUser, logoutUser, getUserProfile, updateUserProfile } from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/auth", authUser);
router.post("/", registerNewUser);


router.post("/logout", protect, logoutUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

// OR

// router.route("/profile").get(getUserProfile).put(updateUserProfile)


export default router;