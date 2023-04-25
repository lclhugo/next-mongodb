import clientPromise from "../../../lib/mongodb";
import {ObjectId} from "mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const idMovie = req.query.idMovie;

    if (req.method === "GET") {
        const commentsGet = await db.collection("comments").find({movie_id: new ObjectId(idMovie)}).toArray();
        res.json({status: 200, data: commentsGet});
    } else if (req.method !== "GET") {
        res.status(405).end();
    }
}

/**
 * @swagger
 * tags:
 *  name: Comments
 *  description: Get all comments for a movie
 * /api/movies/{idMovie}/comments:
 *   get:
 *     tags: [Comments]
 *     summary: Get all comments for a movie
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         description: ID of the movie to retrieve comments for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 617bc641ba06d80597d1d265
 *                       movie_id:
 *                         type: string
 *                         example: 573a1390f29313caabcd4135
 *                       name:
 *                         type: string
 *                         example: "John Smith"
 *                       email:
 *                         type: string
 *                         example: "john.smith@example.com"
 *                       text:
 *                         type: string
 *                         example: "This movie was great!"
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         example: "2021-10-29T16:19:45.441Z"
 *       405:
 *         description: Invalid method
 */
