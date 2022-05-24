/* eslint-disable */
import React, { useEffect, useState } from "react";
/**
* Custom hook to retrieve and store cookies for our application.
* @param {String} key The key to store our data to
* @param {String} defaultValue The default value to return in case the cookie doesn't exist
*/
/*
const useCookie = (key, defaultValue) => {
    const getCookie = () => getItem(key) || defaultValue;
    const [cookie, setCookie] = useState(getCookie());
    const updateCookie = (value) => {
        setCookie(value);
        setItem(key, value);
    };
    return [cookie, updateCookie];
};

const getItem = (key) => {
    let result = null;
    useEffect(() => {
        document.cookie.split("; ").reduce((total, currentCookie) => {
            const item = currentCookie.split("=");
            const storedKey = item[0];
            const storedValue = item[1];
            result = key === storedKey 
              ? decodeURIComponent(storedValue) 
              : total;
        }
    }, [key])
    return result;
    }

const setItem = (key, value) => {
    const now = new Date();
    // set the time to be now + numberOfDays
    document.cookie = `${key}=${value}; path=/`;
};

// TODO: Add context to this component

export default useCookie;

*/