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

export default async function handler(req:any, res:any) {
    // Run cors
    await cors(req, res)
    // Rest of the API logic
    return new Promise<void>( async (resolve, reject)=> {
        try {

        } catch (error) {

        }
    })
}
