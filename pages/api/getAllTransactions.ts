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
const USER_ID = 'user_id';
export default async function handler(req, res) {
    // Run cors
    await cors(req, res)
    // Rest of the API logic
    let finalResponse;
    let finalStatus;
    return new Promise( async (resolve, reject)=> {
        try {
            const user_id = req.headers["user-id"]
            const startDate = req.query.startDate
            const endDate = req.query.endDate
            const config = {
                method: "GET",
                url: API_URL + '/api/earmark/allTransactions',
                params: {
                    user_id: user_id,
                    startDate: startDate,
                    endDate: endDate,
                },
                headers: {
                    'Content-Type': 'application/json',
                    'earmark-api-key': process.env.EARMARK_API_KEY,
                },
            };
            const axiosResponse = await axios(config);
            finalResponse = {
                dataGridTransactions: axiosResponse.data.dataGridTransactions,
                transactionMetadata: axiosResponse.data.transactionMetadata,
                statusCode: 200,
                statusMessage: "Success",
                metaData: axiosResponse.data.metaData,
            }
            finalStatus = 200;
            resolve(finalResponse);
        } catch (error) {
            finalStatus = 400;
            finalResponse = error;
            reject(error);
        }
        await res.status(finalStatus);
        await res.send(finalResponse);
        await res.end();
    })
}
