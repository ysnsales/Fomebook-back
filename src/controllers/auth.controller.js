import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signUp (req, res){
    const {name, email, profile_picture, biography, password} = req.body;

    try {
        const checkEmail = await db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
        if (checkEmail.rows.length > 0) return res.sendStatus(409);

        const hashPassword = bcrypt.hashSync(password, 10);
        await db.query(`INSERT INTO users (name, email, profile_picture, biography, password) VALUES ($1, $2, $3, $4, $5);`, [name, email, profile_picture, biography, hashPassword]);
        res.sendStatus(201);

    }catch (err){
        res.status(500).send(err.message);
    }
};

export async function signIn (req, res){
    const {email, password} = req.body;

    try {
        const checkUser = await db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
        if (checkUser.rows.length === 0) return res.sendStatus(401);

        const user = checkUser.rows[0];
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) return res.sendStatus(401);

        const token = uuid();
        await db.query(`INSERT INTO sessions (user_email, token) VALUES ($1, $2);`, [email, token]);
        res.send({email : user.email, token: token})

    }catch (err){
        res.status(500).send(err.message);
    }
};

