/* eslint-disable */
import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'
import axios from 'axios'

// Initialize the cors middleware
const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
      // Only allow requests with GET, POST and OPTIONS
      methods: ['GET', 'POST', 'OPTIONS'],
    })
);

const API_URL = process.env.API_URL || 'http://localhost:8080';

export default async function handler(req, res) {
    console.log(API_URL);
    // Run cors
    await cors(req, res)
    // Rest of the API logic
    return new Promise( async (resolve, reject)=> {
        try {
            const user_id = req.query.user_id
            const config = {
                method: "POST",
                url: API_URL + "/api/plaid/link/token/create",
                params: {
                    user_id: user_id
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const axiosResponse = await axios(config);
            const response = {
                linkToken: axiosResponse.data,
                statusCode: 200,
                statusMessage: "Success",
                metaData: {
                    user_id: user_id,
                    link_token: axiosResponse.data,
                    requestTime: new Date().toLocaleString(),
                    nextApiUrl: "/api/createLinkToken",
                    backendApiUrl: "/api/plaid/link/token/create",
                    method: "POST",
                }
            }
            res.status(200);
            res.send(response);
            res.end();
            resolve(response);
        } catch (error) {
            res.status(400);
            res.send(error);
            res.end();
            reject(error);
        }
    })
}
