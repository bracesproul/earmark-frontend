/* eslint-disable */
import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'
import axios from 'axios'
import { globalVars } from '../../lib/globalVars'

// Initialize the cors middleware
const cors = initMiddleware(
    Cors({
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
        const user_id = req.query.user_id;
        try {
            const config = {
                method: "GET",
                url: API_URL + '/api/earmark/allAccountInfo',
                params: {
                    user_id: user_id,
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
            finalResponse = error;
            finalStatus = 400;
            reject(error);
        }
        res.send(finalResponse);
        res.status(finalStatus);
        res.end();
    })
}
