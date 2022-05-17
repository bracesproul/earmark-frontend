/* eslint-disable */
import Cors from 'cors'
import initMiddleware from '../../src/lib/init-middleware'
import axios from 'axios'
import { globalVars } from '../../src/lib/globalVars'

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
            const success_message = {
                message: "reached index api route",
                status: 200,
            };

            res.status(200);
            res.send(success_message)
            res.end();
            resolve(success_message)
        } catch (error) {
            const error_message = {
                message: "reached index api route",
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
