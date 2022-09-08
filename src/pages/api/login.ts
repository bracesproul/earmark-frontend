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

            await axios(config);

            await res.status(200);
            await res.send('success')
            await res.end();
            await resolve('success')
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
