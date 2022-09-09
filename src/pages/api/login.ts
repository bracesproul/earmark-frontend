/* eslint-disable */
import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'
import axios from 'axios'
import { globalVars } from '../../lib/globalVars'

// Initialize the cors middleware
const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET, POST and OPTIONS
        methods: ['GET', 'POST', 'OPTIONS'],
    })
);

const API_URL = globalVars().API_URL;

export default async function handler(req, res) {
    // Run cors
    await cors(req, res)
    // Rest of the API logic
    return new Promise( async (resolve, reject)=> {
        try {
            if (req.method !== 'POST') {
                const error_message = {
                    message: "post request required",
                    status: 400,
                    error: "invalid request method"
                }

                res.status(400);
                res.send(error_message);
                res.end();
                reject(error_message);
                return;
            }
            const user_id = req.query.user_id;
            const user_email = req.query.user_email;

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'earmark-api-key': process.env.EARMARK_API_KEY,
                },
                method: 'POST',
                url: API_URL + '/api/earmark/login',
                params: {
                    user_id: user_id,
                    user_email: user_email,
                }
            };

            axios(config)
                .then((response) => {
                    res.status(200);
                    res.send(response.data);
                    res.end();
                })
                .catch((error) => {
                    console.log(error);
                    res.status(400);
                    res.send(error);
                    res.end();
                })
        } catch (error) {
            const error_message = {
                message: "error on login (send webhook) route",
                status: 400,
                error: error
            }

            res.status(400);
            res.send(error_message);
            res.end();
            reject(error_message);
        }
    })
}
