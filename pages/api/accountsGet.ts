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
            const user_id = req.query.user_id
            const config = {
                method: "GET",
                url: API_URL + '/api/plaid/accounts/get',
                params: {
                    user_id: user_id
                },
                headers: {
                    'Content-Type': 'application/json',
                    'earmark-api-key': process.env.EARMARK_API_KEY,
                },
            };
            const axiosResponse = await axios(config);
            const response = {
                accounts: axiosResponse.data.accounts,
                statusCode: 200,
                statusMessage: "Success",
                metaData: axiosResponse.data.metaData,
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
