import clientPromise from "../../lib/mongodb";
import {ObjectId} from "mongodb";
import {useState, useEffect} from 'react';

export default function Home() {

    //show the api data on the wep page
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
            const fetchData = async () => {
                try {
                    setError(null);
                    setData(null);
                    setLoading(true);
                    const response = await fetch('/api/movies');
                    const data = await response.json();
                    setData(data);
                } catch (e) {
                    setError(e);
                }
                setLoading(false);
            };
            fetchData();
        }
        , []);

    if (loading) return <div>loading...</div>;
    if (error) return <div>error</div>;
    if (!data) return null;
    return (
        <div>
            <ul>
                {data.map((item) => (
                    <li key={item._id}>
                        <h3>{item.title}</h3>
                        <p>{item.year}</p>
                        <p>{item.rated}</p>
                    </li>
                ))}
            </ul>
        </div>
    );

}


/**
 * @swagger
 * tags:
 *  name: Movies
 *  description: Get a list of movies
 * /api/movies:
 *   get:
 *     tags: [Movies]
 *     description: Get a list of movies
 *     summary: Get a list of movies
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
 *                         example: 573a1390f29313caabcd4135
 *                       title:
 *                         type: string
 *                         example: "The Shawshank Redemption"
 *                       year:
 *                         type: integer
 *                         example: 1994
 *                       rated:
 *                         type: string
 *                         example: "R"
 *                       runtime:
 *                         type: integer
 *                         example: 142
 *                       genres:
 *                         type: array
 *                         items:
 *                           type: string
 *                           example: "Drama"
 *                       director:
 *                         type: string
 *                         example: "Frank Darabont"
 *                       actors:
 *                         type: string
 *                         example: "Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler"
 *                       plot:
 *                         type: string
 *                         example: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
 *                       poster:
 *                         type: string
 *                         example: "https://m.media-amazon.com/images/M/MV5BMjE..."
 *                       imdb:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "tt0111161"
 *                           rating:
 *                             type: number
 *                             example: 9.3
 *                           votes:
 *                             type: integer
 *                             example: 2461320
 *                           url:
 *                             type: string
 *                             example: "https://www.imdb.com/title/tt0111161/"
 *                       tomato:
 *                         type: object
 *                         properties:
 *                           meter:
 *                             type: integer
 *                             example: 91
 *                           image:
 *                             type: string
 *                             example: "certified"
 *                           rating:
 *                             type: number
 *                             example: 8.8
 *                           reviews:
 *                             type: integer
 *                             example: 287
 *                           fresh:
 *                             type: integer
 *                             example: 263
 *                           consensus:
 *                             type: string
 *                             example: "The Shawshank Redemption is an uplifting, deeply satisfying prison drama with sensitive direction and fine performances."
 *                           userMeter:
 *                             type: integer
 *                             example: 98
 *                           userRating:
 *                             type: number
 *                             example: 4.5
 *                           userReviews:
 *                             type: integer
 *                             example: 1110657
 *       405:
 *         description: Invalid method
 */

