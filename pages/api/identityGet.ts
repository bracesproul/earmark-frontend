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
{
    "accounts": [
        [
            {
                "account_id": "bMdxn1EePKHR9gBLzz85tzDMkmKNAnfN5xyae",
                "name": "Plaid Checking",
                "official_name": "Plaid Gold Standard 0% Interest Checking",
                "subtype": "checking",
                "type": "depository",
                "balances": {
                    "available": 100,
                    "current": 110,
                    "iso_currency_code": "USD",
                    "limit": null,
                    "unofficial_currency_code": null
                }
            },
            {
                "account_id": "mK15xqyW3jTGnlke77jriW5JgwNMn9IMbmwxl",
                "name": "Plaid Saving",
                "official_name": "Plaid Silver Standard 0.1% Interest Saving",
                "subtype": "savings",
                "type": "depository",
                "balances": {
                    "available": 200,
                    "current": 210,
                    "iso_currency_code": "USD",
                    "limit": null,
                    "unofficial_currency_code": null
                }
            }
        ],
    ],
    "accountIdentities": [
        [
            {
                "addresses": [
                    {
                        "data": {
                            "city": "Malakoff",
                            "country": "US",
                            "postal_code": "14236",
                            "region": "NY",
                            "street": "2992 Cameron Road"
                        },
                        "primary": true
                    },
                ],
                "emails": [
                    {
                        "data": "accountholder0@example.com",
                        "primary": true,
                        "type": "primary"
                    },
                ],
                "names": [
                    "Alberta Bobbeth Charleson"
                ],
                "phone_numbers": [
                    {
                        "data": "1112223333",
                        "primary": false,
                        "type": "home"
                    },
                ]
            },
            {
                "addresses": [
                    {
                        "data": {
                            "city": "Malakoff",
                            "country": "US",
                            "postal_code": "14236",
                            "region": "NY",
                            "street": "2992 Cameron Road"
                        },
                        "primary": true
                    },
                ],
                "emails": [
                    {
                        "data": "accountholder0@example.com",
                        "primary": true,
                        "type": "primary"
                    },
                ],
                "names": [
                    "Alberta Bobbeth Charleson"
                ],
                "phone_numbers": [
                    {
                        "data": "1112223333",
                        "primary": false,
                        "type": "home"
                    },
                ]
            }
        ],
    ],
    "statusCode": 200,
    "statusMessage": "Success",
    "metaData": {
        "totalAccounts": 1,
        "user_id": "M1uTm2PnWUY8CZCwdx32aBMLWkZ2",
        "requestTime": "5/7/2022, 5:38:00 PM",
        "requestIds": [
            "jTqqcIq1BL50Vaf"
        ],
        "nextApiUrl": "/api/plaid/identity/get",
        "backendApiUrl": "/api/identityGet",
        "method": "GET"
    }
}
*/
console.log(process.env.NEXT_PUBLIC_TEST)
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export default async function handler(req, res) {
    // Run cors
    await cors(req, res)
    // Rest of the API logic
    return new Promise( async (resolve, reject)=> {
        try {
            const user_id = req.query.user_id
            const config = {
                method: "GET",
                url: API_URL + '/api/plaid/identity/get',
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
                accountIdentities: axiosResponse.data.accountIdentities,
                statusCode: 200,
                statusMessage: "Success",
                metaData: axiosResponse.data.metaData,
            }
            await res.status(200);
            await res.send(response);
            await res.end();
            resolve(response);
        } catch (error) {
            res.status(400);
            res.send(error);
            res.end();
            reject(error);
        }
    })
}
