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
    let finalResponse;
    let finalStatus;
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
                    'earmark-api-key': process.env.EARMARK_API_KEY,
                },
            };
            const axiosResponse = await axios(config);
            finalResponse= {
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
            };
            finalStatus = 200;
        } catch (error) {
            finalResponse = error;
            finalStatus = 400;
            reject(error);
        }
        await res.status(finalStatus);
        await res.send(finalResponse);
        await res.end();
        resolve(finalResponse);
    })
}
