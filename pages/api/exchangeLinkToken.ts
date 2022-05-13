/* eslint-disable */
import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'
import axios from 'axios'

import { initializeApp } from "firebase/app";
import { getFirestore, 
    doc, 
    setDoc,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCOnXDWQ369OM1lW0VC5FdYE19q1ug0_dc",
    authDomain: "earmark-8d1d3.firebaseapp.com",
    projectId: "earmark-8d1d3",
    storageBucket: "earmark-8d1d3.appspot.com",
    messagingSenderId: "46302537330",
    appId: "1:46302537330:web:403eac7f28d2a4868944eb",
    measurementId: "G-5474KY2MRV"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize the cors middleware
const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
      // Only allow requests with GET, POST and OPTIONS
      methods: ['GET', 'POST', 'OPTIONS'],
    })
);

export default async function handler(req, res) {
    // Run cors
    await cors(req, res)
    // Rest of the API logic
    return new Promise( async (resolve, reject)=> {
        try {
            const user_id = req.query.user_id;
            const publicToken = req.query.publicToken;

            const config = {
                method: "POST",
                url: "http://localhost:5000/api/plaid/item/public_token/exchange",
                params: {
                    publicToken: publicToken,
                    user_id: user_id
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const axiosResponse = await axios(config);
            // await updateFirestore(user_id, axiosResponse.data.access_token, axiosResponse.data.item_id);
            const response = {
                statusCode: 200,
                statusMessage: axiosResponse.data,
                metaData: {
                    user_id: user_id,
                    requestTime: new Date().toLocaleString(),
                    nextApiUrl: "/api/exchangeLinkToken",
                    backendApiUrl: "/api/plaid/item/public_token/exchange",
                    method: "POST",
                }
            }
            res.status(200);
            res.send(response);
            res.end();
            resolve(response);
        } catch (error) {
            res.status(400);
            res.send(error);
            res.end();
            reject(error);
        }
    })
}
