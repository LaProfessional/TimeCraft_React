import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import express from "express";

const router = express.Router();

router.post('/register', async (req, response) => {
    const { username, password } = req.body.userData;


});

export default router;