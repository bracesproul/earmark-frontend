/* eslint-disable */
import Cors from 'cors'
import initMiddleware from '../../../src/lib/init-middleware'
import axios from 'axios'
import { globalVars } from '../../../src/lib/globalVars'

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
        let finalResponse;
        let finalStatus;
        try {
            const config = {
                method: "GET",
                url: API_URL + '/api/earmark/visuals',
                params: {
                    startDate: req.query.startDate,
                    endDate: req.query.endDate,
                    user_id: req.query.user_id,
                    queryType: req.query.queryType,
                },
                headers: {
                    'Content-Type': 'application/json',
                    'earmark-api-key': process.env.EARMARK_API_KEY,
                },
            };
            const { data } = await axios(config);
            finalResponse = data;
            finalStatus = 200;
        } catch (error) {
            console.error('in client side catch', error);
            finalResponse = error;
            finalStatus = error.response.status;
        }
        if (finalStatus !== 200) reject(finalResponse);
        else resolve(finalResponse);
        await res.status(finalStatus).send(finalResponse);
        // await res.status(finalStatus);
        // await res.end(finalResponse);
    })
}
