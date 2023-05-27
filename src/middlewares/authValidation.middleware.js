import { db } from "../database/database.connection.js";

export async function authValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) return res.sendStatus(401);

  try {
    const checkSession = await db.query(`SELECT * FROM sessions WHERE token = $1`, [
      token,
    ]);
    if (checkSession.rows.length === 0) return res.sendStatus(401);

    res.locals.session = checkSession.rows[0];

    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
};