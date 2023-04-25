import clientPromise from "../../../../lib/mongodb";
import {ObjectId} from "mongodb";

export default async function handler(req, res) {
    const idComment = req.query.idComment;
    const idMovie = req.query.idMovie;
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    if (req.method === "GET") {
        const dbCommentGet = await db.collection("comments").findOne({_id: new ObjectId(idComment)});
        res.json({status: 200, data: {comment: dbCommentGet}});
    } else if (req.method === "POST") {
        const dbCommentPost = await db.collection("comments").insertOne({
            movie_id: new ObjectId(idMovie),
            text: "test"
        });
        res.json({status: 200, data: {comment: dbCommentPost}});
    } else if (req.method === "PUT") {
        const dbCommentUpdate = await db.collection("comments").updateOne({_id: new ObjectId(idComment)}, {$set: {text: "test"}});
        res.json({status: 200, data: {comment: dbCommentUpdate}});
    } else if (req.method === "DELETE") {
        const dbCommentDelete = await db.collection("comments").deleteOne({_id: new ObjectId(idComment)});
        res.json({status: 200, data: {comment: dbCommentDelete}});
    } else res.status(405).end();
}

/**
 * @swagger
 * tags:
 *  name: Comment
 *  description: Comment operations
 * /api/comment/{idMovie}/{idComment}:
 *   get:
 *     tags: [Comment]
 *     summary: Get a comment by ID
 *     parameters:
 *       - in: query
 *         name: idComment
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the comment to get
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     comment:
 *                       type: object
 *                       $ref: '#/components/schemas/Comment'
 *   post:
 *     tags: [Comment]
 *     summary: Add a new comment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idMovie:
 *                 type: string
 *                 description: ID of the movie associated with the comment
 *               text:
 *                 type: string
 *                 description: Text of the comment
 *             required:
 *               - idMovie
 *               - text
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     comment:
 *                       type: object
 *                       $ref: '#/components/schemas/Comment'
 *   put:
 *     tags: [Comment]
 *     summary: Update an existing comment
 *     parameters:
 *       - in: query
 *         name: idComment
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the comment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: New text of the comment
 *             required:
 *               - text
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     comment:
 *                       type: object
 *                       $ref: '#/components/schemas/Comment'
 *   delete:
 *     tags: [Comment]
 *     summary: Delete a comment by ID
 *     parameters:
 *       - in: query
 *         name: idComment
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the comment to delete
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     comment:
 *                       type: object
 *                       $ref: '#/components/schemas/Comment'
 *       405:
 *         description: Method not allowed
 */
