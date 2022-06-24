/* eslint-disable */
import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'
import axios from 'axios'
import { globalVars } from '../../lib/globalVars'

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
            const user_id = req.query.user_id;
            const func = req.query.func;
            const params = req.query.params;
            const config = {
                method: "POST",
                url: API_URL + '/api/firebase/firestore',
                params: {
                    user_id: user_id,
                    func: func,
                    params: params,
                },
                headers: {
                    'Content-Type': 'application/json',
                    'earmark-api-key': process.env.EARMARK_API_KEY,
                },
            };
            const axiosResponse = await axios(config);
            finalResponse = axiosResponse.data;
            finalStatus = 200;
            resolve(resolve);
        } catch (error) {
            finalResponse = error;
            finalStatus = 400;
            reject(error);
        }
        res.status(finalStatus);
        res.send(finalResponse);
        res.end();
    })
}
