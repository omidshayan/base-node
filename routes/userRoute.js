import express from "express";
import { deleteUser, getUsers, userLogin, userRegister } from "../controllers/user/UserController.js";
import { verifyToken } from "../middleware/token/verifyToken.js";
import { refreshToken } from "../controllers/refreshToken/refreshToken.js";

const router = express.Router();

router.get("/token", refreshToken)

router.post("/user/register", userRegister)
router.post("/login", userLogin)

// router.get("/users",verifyToken, getUsers)
router.delete("/users/:id", deleteUser)


export default router;
