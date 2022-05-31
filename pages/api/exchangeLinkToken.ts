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
    let response;
    let responseCode;
    return new Promise( async (resolve, reject)=> {
        try {
            const user_id = req.query.user_id;
            const publicToken = req.query.publicToken;

            const config = {
                method: "POST",
                url: API_URL + '/api/earmark/public_token/exchange',
                params: {
                    publicToken: publicToken,
                    user_id: user_id
                },
                headers: {
                    'Content-Type': 'application/json',
                    'earmark-api-key': process.env.EARMARK_API_KEY,
                },
            };
            const axiosResponse = await axios(config);

            response = {
                statusCode: 200,
                statusMessage: axiosResponse.data,
                metaData: {
                    user_id: user_id,
                    requestTime: new Date().toLocaleString(),
                    nextApiUrl: "/api/earmark/public_token/exchange",
                    backendApiUrl: "/api/earmark/public_token/exchange",
                    method: "POST",
                }
            }
            responseCode = 200;
            resolve(response);
        } catch (error) {
            response = error;
            responseCode = 400;
            reject(error);
        }
        res.status(responseCode);
        res.send(response);
        res.end();
    })
}
