import { db } from "../database/database.connection.js";

export async function createPost(req, res){
    const {picture, description} = req.body;
    const user_email = res.locals.session.user_email;

   try{
    const result = await db.query(`INSERT INTO posts (picture, description, user_email) VALUES ($1, $2, $3) RETURNING id;`, [picture, description, user_email]);
    const insertedId = result.rows[0].id;

    const returnBody = await db.query(`SELECT * FROM posts WHERE id = $1;`,[insertedId]);
    res.status(201).send(returnBody.rows[0]);
   
}
   catch (err) {
    res.status(500).send(err.message);
}
};

export async function getUserPosts(req, res){
    const user_email = res.locals.session.user_email;

    try {
        const posts = await db.query(`SELECT * FROM posts WHERE user_email = $1;`, [user_email]);
        res.status(200).send(posts.rows)

    }
    catch (err){
        res.status(500).send(err.message);
    }

};

export async function getPostsById(req, res){
    const {id} = req.params;
    try {
        const user = await db.query(`SELECT * FROM users WHERE id = $1;`,[id]);
        const user_email = user.rows[0].email;
        const posts = await db.query(`SELECT * FROM posts WHERE user_email = $1;`, [user_email]);
        res.status(200).send(posts.rows)

    }
    catch (err){
        res.status(500).send(err.message);
    }

}