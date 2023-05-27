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
};

}