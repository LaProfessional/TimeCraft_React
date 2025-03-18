import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import express from "express";
import pool from "./config/db.js";

const router = express.Router();

router.post('/registration', async (req, response) => {
    const { username, password } = req.body.userData;

    const hashedPassword = await bcrypt.hash(password, 10);

    const registrationQuery = `
        INSERT INTO users
            (username, password_hash)
        VALUES ($1, $2) RETURNING id, username
        ;`;

    const res = await pool.query(registrationQuery, [ username, hashedPassword ]);
    response.status(200).json(res);
});

router.post('/login', async (req, response) => {
    const { username, password } = req.body.userData;

    const loginQuery = `
        SELECT *
        FROM users
        WHERE username = $1
        ;`;

    const user = await pool.query(loginQuery, [ username ]);
    if (user.rows.length === 0) return response.status(401).json({ message: "Пользователь не найден", errorLogin: true });

    const valid = await bcrypt.compare(password, user.rows[0].password_hash);
    if (!valid) return response.status(401).json({ message: "Неверный пароль", errorPassword: true });

    const token = jwt.sign({ userId: user.rows[0].id }, "secret", {
        expiresIn: "1h",
    });

    response.status(200).json(token);
});

export default router;