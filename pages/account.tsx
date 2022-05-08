/* eslint-disable */
import React from 'react';
import axios from 'axios';

export default function Home() {
    return (
        <div>
            <h1>Account</h1>
        </div>
    )
}
/*
const identityGet = async (user_id:string) => {
    const config = {
        method: "get",
        url: '/api/identityGet',
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          user_id: user_id
        }
      };
      const response = await axios(config);
      console.log("GET IDENTITY UI END SUCCESS", response.data);
}
identityGet("M1uTm2PnWUY8CZCwdx32aBMLWkZ2");
*/