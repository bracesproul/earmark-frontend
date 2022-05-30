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
    return new Promise( async (resolve, reject) => {
        if (req.query.func == 'updateUserSecurity') {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'earmark-api-key': process.env.EARMARK_API_KEY,
                    },
                    params: {
                        user_id: req.query.user_id,
                        func: req.query.func,
                        params: req.query.params,
                    },
                    url: API_URL + "/api/firebase/firestore",
                    method: "POST",
                }
                const response = await axios(config);
                finalResponse = response.data;
                finalStatus = 200;
            } catch (error) {
                finalResponse = 'error';
                finalStatus = 400;
            }
        } else if (req.query.func == 'updateUserAddress') {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'earmark-api-key': process.env.EARMARK_API_KEY,
                    },
                    params: {
                        user_id: req.query.user_id,
                        func: req.query.func,
                        params: req.query.params,
                    },
                    url: API_URL + "/api/firebase/firestore",
                    method: "POST",
                }
                const response = await axios(config);
                finalResponse = response.data;
                finalStatus = 200;
            } catch (error) {
                finalResponse = 'error';
                finalStatus = 400;
            }
        } else if (req.query.func == 'updateUserPersonal') {
            try {
                console.log(req.query)
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'earmark-api-key': process.env.EARMARK_API_KEY,
                    },
                    params: {
                        user_id: req.query.user_id,
                        params: req.query.params,
                        func: 'updateUserPersonal',
                    },
                    url: API_URL + "/api/firebase/firestore",
                    method: "POST",
                }
                const response = await axios(config);
                finalResponse = response.data;
                finalStatus = 200;
            } catch (error) {
                finalResponse = 'error';
                finalStatus = 400;
            }
        } else if (req.query.func == 'deleteAccount') {
            try {
                console.log(req.query)
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'earmark-api-key': process.env.EARMARK_API_KEY,
                    },
                    params: {
                        user_id: req.query.user_id,
                        params: req.query.params,
                        func: 'deleteAccount',
                    },
                    url: API_URL + "/api/firebase/firestore",
                    method: "POST",
                }
                const response = await axios(config);
                finalResponse = response.data;
                finalStatus = 200;
            } catch (error) {
                finalResponse = 'error';
                finalStatus = 400;
            }
        } else if (req.query.func == 'deleteAllInstitutions') {
            try {
                console.log(req.query)
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'earmark-api-key': process.env.EARMARK_API_KEY,
                    },
                    params: {
                        user_id: req.query.user_id,
                        params: req.query.params,
                        func: 'deleteAllInstitutions',
                    },
                    url: API_URL + "/api/firebase/firestore",
                    method: "POST",
                }
                const response = await axios(config);
                finalResponse = response.data;
                finalStatus = 200;
            } catch (error) {
                finalResponse = 'error';
                finalStatus = 400;
            }
        } else if (req.query.func == 'updateAccountElement') {
            try {
                console.log(req.query)
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'earmark-api-key': process.env.EARMARK_API_KEY,
                    },
                    params: {
                        user_id: req.query.user_id,
                        params: req.query.params,
                        func: 'updateAccountElement',
                    },
                    url: API_URL + "/api/firebase/firestore",
                    method: "POST",
                }
                const response = await axios(config);
                finalResponse = response.data;
                finalStatus = 200;
            } catch (error) {
                finalResponse = 'error';
                finalStatus = 400;
            }
        }

        await res.status(finalStatus);
        await res.send(finalResponse)
        await res.end();
        resolve(finalResponse)
    })
}
