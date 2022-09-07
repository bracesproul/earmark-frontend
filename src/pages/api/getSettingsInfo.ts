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
    await cors(req, res)
    const user_id = req.query.user_id;
    const settingsType = req.query.settingsType;
    return new Promise( async (resolve, reject)=> {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'earmark-api-key': process.env.EARMARK_API_KEY,
                },
                method: 'GET',
                url: API_URL + '/api/earmark/getAccountDetails',
                params: {
                    user_id: user_id,
                    settingsType: settingsType,
                }
            };
            const { data } = await axios(config);
            await res.status(200);
            await res.send(data)
            await res.end();
        } catch (error) {
            console.error(error);
            await res.status(400);
            await res.send(error)
            await res.end();
        }
    })
}
