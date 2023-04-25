import clientPromise from "../../../lib/mongodb";
import {ObjectId} from "mongodb";


export default async function handler(req, res) {
    const idMovie = req.query.id
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    if (req.method === "GET") {
        const dbMovieGet = await db.collection("movies").findOne({_id: new ObjectId(idMovie)});
        res.json({status: 200, data: {movie: dbMovieGet}});
    } else if (req.method === "POST") {
        const dbMoviePost = await db.collection("movies").insertOne({title: "test"}, {plot: "test"});
        res.json({status: 200, data: {movie: dbMoviePost}});
    } else if (req.method === "PUT") {
        const dbMovieUpd = await db.collection("movies").updateOne({_id: new ObjectId(idMovie)}, {$set: {imdb: {rating: 0}}});
        res.json({status: 200, data: {movie: dbMovieUpd}});
    } else if (req.method === "DELETE") {
        const dbMovieDel = await db.collection("movies").deleteOne({_id: new ObjectId(idMovie)});
        res.json({status: 200, data: {movie: dbMovieDel}});
    } else res.status(405).end();
}



/**
 * @swagger
 * tags:
 *   name: Movie
 *   description: Movie operations
 * /api/movie/{id}:
 *   get:
 *     tags: [Movie]
 *     summary: Get a movie by ID
 *     description: Retrieve a movie from the database by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the movie to retrieve.
 *     responses:
 *       "200":
 *         description: A movie object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/definitions/Movie"
 *   post:
 *     tags: [Movie]
 *     summary: Create a new movie
 *     description: Create a new movie in the database.
 *     parameters:
 *       - in: body
 *         name: movie
 *         description: The movie object to create.
 *         required: true
 *         schema:
 *           $ref: "#/definitions/Movie"
 *     responses:
 *       "200":
 *         description: A movie object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/definitions/Movie"
 *   put:
 *     tags: [Movie]
 *     summary: Update a movie by ID
 *     description: Update a movie in the database by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the movie to update.
 *       - in: body
 *         name: movie
 *         description: The movie object to update.
 *         required: true
 *         schema:
 *           $ref: "#/definitions/Movie"
 *     responses:
 *       "200":
 *         description: A movie object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/definitions/Movie"
 *   delete:
 *     tags: [Movie]
 *     summary: Delete a movie by ID
 *     description: Delete a movie from the database by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the movie to delete.
 *     responses:
 *       "200":
 *         description: A movie object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/definitions/Movie"
 *
 * definitions:
 *   Movie:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         description: The ID of the movie.
 *       title:
 *         type: string
 *         description: The title of the movie.
 *       plot:
 *         type: string
 *         description: The plot of the movie.
 *       imdb:
 *         type: object
 *         description: The imdb rating of the movie.
 *         properties:
 *           rating:
 *             type: number
 *             description: The imdb rating of the movie.
 */
