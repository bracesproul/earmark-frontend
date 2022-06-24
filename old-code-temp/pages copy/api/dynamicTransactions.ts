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
    await cors(req, res)
    let finalResponse;
    let finalStatus;
    const user_id = req.query.user_id;
    const page_id = req.query.page_id;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    return new Promise( async (resolve, reject)=> {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'earmark-api-key': process.env.EARMARK_API_KEY,
                },
                method: 'GET',
                url: API_URL + '/api/earmark/getDynamicTransactions',
                params: {
                    user_id: user_id,
                    page_id: page_id,
                    startDate: startDate,
                    endDate: endDate
                }
            };
            const { data } = await axios(config);
            finalResponse = data;
            finalStatus = 200;
        } catch (error) {
            finalResponse = error;
            finalStatus = 400;
        }
        await res.status(finalStatus);
        await res.send(finalResponse)
        await res.end();
    })
}
