import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/*  READ ROUTES */
// grabs the feed when we're on the home page
router.get("/", verifyToken, getFeedPosts);
// grabs the posts relevant to the user
router.get("/:userId/posts", verifyToken, getUserPosts)

/* UPDATE ROUTES */
// for likging and unliking post
router.patch("/:id/like", verifyToken, likePost)

export default router;