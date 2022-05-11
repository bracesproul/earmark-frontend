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

// API Object
/*
accounts: accounts,
numbers: numbers,
statusCode: 200,
statusMessage: "Success",
metaData: {
    totalAccounts: accounts[0].length,
    user_id: user_id,
    requestTime: new Date().toLocaleString(),
    requestIds: request_ids,
    nextApiUrl: "/api/plaid/auth/get",
    backendApiUrl: "/api/authGet",
    method: "GET",
},
*/

export default async function handler(req, res) {
    // Run cors
    await cors(req, res)
    // Rest of the API logic
    return new Promise( async (resolve, reject)=> {
        try {
            const user_id = req.query.user_id
            const config = {
                method: "GET",
                url: "http://localhost:5000/api/plaid/auth/get",
                params: {
                    user_id: user_id
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const axiosResponse = await axios(config);
            const response = {
                accounts: axiosResponse.data.accounts,
                numbers: axiosResponse.data.numbers,
                statusCode: 200,
                statusMessage: "Success",
                metaData: axiosResponse.data.metaData,
            }
            res.status(200);
            res.send(response);
            res.end();
            resolve(resolve);
        } catch (error) {
            res.status(400);
            res.send(error);
            res.end();
            reject(error);
        }
    })
}
