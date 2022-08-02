/* eslint-disable */
import React, { useState, useEffect, useContext, createContext } from "react";
import { useRouter } from 'next/router'

const removeCacheContext = createContext({});
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideRemoveCache({ children }) {
  const removeCache = useProvideRemoveCache();
  return <removeCacheContext.Provider value={removeCache}>{children}</removeCacheContext.Provider>;
}

const useProvideRemoveCache = () => {
    const router = useRouter();
    const listOfAccountCacheKeys = ['accountsCacheExpTime', 'accountsCachedData', 'accountBalanceCachedData', 'accountBalanceCacheExpTime']

    const removeOldCache = () => {
        console.log('running...')
        listOfAccountCacheKeys.forEach((accCacheName:string) => {
            for (let key in localStorage) {
                if (key == accCacheName) {
                    localStorage.removeItem(key);
                    console.log('removed')
                }
            }
        });
        router.reload();
    };

  return {
    removeOldCache
  };
}
interface IUseProvideRemoveCache {
  removeOldCache: () => any;
}

export const useRemoveCache = () => useContext(removeCacheContext) as IUseProvideRemoveCache;