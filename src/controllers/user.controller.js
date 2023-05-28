import { db } from "../database/database.connection.js";

export async function getFollowers(req, res){
    const user_email = res.locals.session.user_email;

    try {
        const followers = await db.query(`SELECT * FROM followers WHERE user_email = $1;`, [user_email]);
        res.status(200).send(followers.rows);

    }
    catch (err){
        res.status(500).send(err.message);
    }
};

export async function follow(req, res){
    const user_email = res.locals.session.user_email;
    const { following } = req.body;

  try {
    await db.query('INSERT INTO user_following (user_email, following) VALUES ($1, $2)', [user_email, following]);
    res.sendStatus(200); 

  } catch (err) {
    res.status(500).send(err.message); // Envie uma resposta de erro caso ocorra algum problema
  }
};

export async function getFollowing(req, res){
    const user_email = res.locals.session.user_email;

    try {
        const following= await db.query(`SELECT * FROM user_following WHERE user_email = $1;`, [user_email]);
        res.status(200).send(following.rows);

    }
    catch (err){
        res.status(500).send(err.message);
    }
};