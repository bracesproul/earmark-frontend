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
        const user_id = req.query.user_id
        const queryType = req.query.queryType
        let config;
        try {
            if ( queryType === 'spendingOverview') {
                const spendingStartDate = req.query.spendingStartDate;
                const spendingEndDate = req.query.spendingEndDate;
                config = {
                    params: {
                        user_id: user_id,
                        startDate: '2022-02-28',
                        endDate: '2022-06-05',
                        queryType: queryType,
                        spendingStartDate: spendingStartDate,
                        spendingEndDate: spendingEndDate,
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        'earmark-api-key': process.env.EARMARK_API_KEY,
                    },
                    url: API_URL + '/api/earmark/dashboard',
                }
            } else if ( queryType === 'topMerchants') {
                const merchantsStartDate = req.query.merchantsStartDate;
                const merchantsEndDate = req.query.merchantsEndDate;
                config = {
                    params: {
                        user_id: user_id,
                        startDate: '2022-02-28',
                        endDate: '2022-06-05',
                        queryType: queryType,
                        merchantsStartDate: merchantsStartDate,
                        merchantsEndDate: merchantsEndDate,
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        'earmark-api-key': process.env.EARMARK_API_KEY,
                    },
                    url: API_URL + '/api/earmark/dashboard',
                }
            } else {
                config = {
                    params: {
                        user_id: user_id,
                        startDate: req.query.startDate,
                        endDate: req.query.endDate,
                        queryType: queryType,
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        'earmark-api-key': process.env.EARMARK_API_KEY,
                    },
                    url: API_URL + '/api/earmark/dashboard',
                }
            }
 
            const response = await axios(config)
            finalResponse = response.data;
            finalStatus = 200;
            resolve(resolve);
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
