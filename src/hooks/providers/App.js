import AsyncStorage from '@react-native-community/async-storage';
import React, {
    useState,
    useEffect,
    useCallback,
    createContext,
    useContext,
} from 'react';
import io from 'socket.io-client';
import {variables} from '../../constants/variables';
import {getCountries} from '../../api/misc';
import {LoaderContext} from './Loader';
export const AppContext = createContext();
import {logCrashlytics, logErrorOnCrashlytics} from '../../utils/index';
export const AppProvider = ({children}) => {
    // let socket = io(variables.baseUrl);
    const {setLoader} = useContext(LoaderContext);
    const [nav, setNav] = useState();
    const [socket, setSocket] = useState(null);
    const [countries, setCountries] = useState([]);
    useEffect(() => {}, []);

    const doGetCountries = () => {
        setLoader(true);
        logCrashlytics('Getting Countries list...');
        getCountries()
            .then((c) => {
                setCountries(c);
                setLoader(false);
            })
            .catch((error) => {
                logErrorOnCrashlytics(err);
                setLoader(false);
            });
    };
    const navigateTo = useCallback((name) => {
        if (nav) {
            nav.navigate(name);
        }
    });

    const setNavigation = (nav) => {
        setNav(nav);
    };

    return (
        <AppContext.Provider
            value={{
                nav,
                socket,
                setSocket,
                doGetCountries,
                countries,
                setNavigation,
                navigateTo,
            }}>
            {children}
        </AppContext.Provider>
    );
};
