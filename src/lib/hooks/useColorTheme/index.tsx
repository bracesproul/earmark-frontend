/* eslint-disable */
import React, {
    useContext,
    createContext,
    useMemo,
    useState,
    useEffect,
    useRef
} from "react";
import { useCookies } from "react-cookie";
import { PaletteMode } from '@mui/material';

const colorThemeContext = createContext({});

export function ProvideColorTheme({ children }) {
    const colorTheme = useProvideColorTheme();
    return <colorThemeContext.Provider value={colorTheme}>{children}</colorThemeContext.Provider>;
}

const useProvideColorTheme = () => {
    const [cookies, setCookie] = useCookies(['earmark-theme']);
    const [mode, setMode] = useState<PaletteMode>('dark');
    const firstLoad = useRef(true);

    useEffect(() => console.log('mode inside hook', mode, 'first load', firstLoad.current), [mode]);

    useEffect(() => {
        if (firstLoad.current) {
            setMode(cookies['earmark-theme'] as PaletteMode || 'dark');
            firstLoad.current = false;
            return;
        }
    }, [mode])

    const setThemeCookie = (newTheme: PaletteMode) => {
        console.log('theme cookie running')
        setCookie('earmark-theme', newTheme, { path: '/' });
        setMode(newTheme);
    }

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode: PaletteMode) =>
                    prevMode === 'light' ? 'dark' : 'light',
                );
            },
        }),
        [],
    );

    return {
        colorMode,
        mode,
        setMode,
        setThemeCookie,
        cookies,
        firstLoad
    };
}

interface IUseProvideColorTheme {
    colorThemeMethod: () => any;
    mode: /*PaletteMode*/any;
    setMode: (mode: PaletteMode) => any;
    setThemeCookie: (newTheme: PaletteMode) => any;
    cookies: any;
    firstLoad: any;
}

export const useColorTheme = () => useContext(colorThemeContext) as IUseProvideColorTheme;