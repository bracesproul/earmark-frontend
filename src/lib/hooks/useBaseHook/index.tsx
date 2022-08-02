/* eslint-disable */
import React, { useContext, createContext } from "react";

const baseContext = createContext({});

export function ProvideAuth({ children }) {
    const base = useProvideBase();
    return <baseContext.Provider value={base}>{children}</baseContext.Provider>;
}

const useProvideBase = () => {

    const baseMethod = async (prop) => {
        console.log(prop);
        return prop;
    }

    return {
        baseMethod
    };
}
interface IUseProvideBase {
    baseMethod: (prop: any) => Promise<any>;
}

export const useBase = () => useContext(baseContext) as IUseProvideBase;