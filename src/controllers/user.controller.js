import { db } from "../database/database.connection.js";



export async function getFollowers(req, res){
    const user_email = res.locals.session.user_email;

    try {
        const followers = await db.query(`SELECT followed_by FROM followers WHERE user_email = $1;`, [user_email]); 
        const followerEmails = followers.rows.map((follower) => follower.followed_by);
        if (followerEmails.length === 0) {
          // Se não houver seguidores, retornar uma lista vazia
          res.status(200).send([]);
          return;
        }
    
        const placeholders = followerEmails.map((_, i) => `$${i + 1}::text`).join(", ");
        const query = `SELECT * FROM users WHERE email IN (${placeholders});`;
        const values = followerEmails;
    
        const users = await db.query(query, values);
    
        res.status(200).send(users.rows);
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
    await db.query('INSERT INTO followers (user_email, followed_by) VALUES ($1, $2)', [following, user_email]);
    res.sendStatus(200); 

  } catch (err) {
    res.status(500).send(err.message);
  }
};

export async function getFollowing(req, res){
    const user_email = res.locals.session.user_email;

    try {
        const following = await db.query(`SELECT following FROM user_following WHERE user_email = $1;`, [user_email]);
        const followingEmails = following.rows.map((following) => following.following);
        if (followingEmails.length === 0) {
          // Se não houver seguidores, retornar uma lista vazia
          res.status(200).send([]);
          return;
        }
    
        const placeholders = followingEmails.map((_, i) => `$${i + 1}::text`).join(", ");
        const query = `SELECT * FROM users WHERE email IN (${placeholders});`;
        const values = followingEmails;
    
        const users = await db.query(query, values);
    
        res.status(200).send(users.rows);

    }
    catch (err){
        res.status(500).send(err.message);
    }
};