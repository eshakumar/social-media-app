import express from "express";
import { getUser, getUserFriends, addRemoveFriend } from "../controllers/users.js";
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/* READ ROUTES (route that doesn't update the database at all, just gets info) */
// get user from db
router.get("/:id", verifyToken, getUser); /* use the query string from the frontend (id) to get information from the db */
// get users friends from db
router.get("/:id/friends", verifyToken, getUserFriends)

/* UPDATE ROUTES (route that will update the db) */
// need the id of the current user and the id of the friend we want to add or remove
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;