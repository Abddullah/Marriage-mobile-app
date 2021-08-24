import React, {
    useEffect,
    useContext,
    createContext,
    useState,
    useCallback,
} from 'react';
import {LoaderContext} from './Loader';
import {ToastContext} from './Toast';
import {
    addMatch,
    getMatches,
    getMessages,
    updateMessage,
    deleteMessage,
} from '../../api/match';
import {AppContext} from './App';
import {logCrashlytics, logErrorOnCrashlytics} from '../../utils/index';

export const MatchContext = createContext();

export const MatchProvider = ({children}) => {
    const {openToast} = useContext(ToastContext);
    const {setLoader} = useContext(LoaderContext);
    const {socket} = useContext(AppContext);
    const [matches, setMatches] = useState([]);
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        setMessages([]);
        setMatches([]);
        if (socket) {
            socket.off('message');
            socket.on('message', (data) => {
                setMessages((state) => [...state, data]);
            });
        }
    }, [socket]);

    const doAddMatch = (data) => {
        return new Promise(async (resolve, reject) => {
            setLoader(true);
            logCrashlytics('Add Match....');
            addMatch(data)
                .then((ret) => {
                    setLoader(false);
                    // setMatches(ret)
                    // console.log(ret)
                    resolve(ret);
                })
                .catch((err) => {
                    setLoader(false);
                    logErrorOnCrashlytics(err);
                    openToast('error', err);
                    reject(err);
                });
        });
    };

    const doGetMatches = () => {
        return new Promise(async (resolve, reject) => {
            setLoader(true);
            logCrashlytics('Getting Matches....');
            getMatches()
                .then((ret) => {
                    setLoader(false);
                    setMatches(ret);
                    resolve(ret);
                })
                .catch((err) => {
                    setLoader(false);
                    logErrorOnCrashlytics(err);
                    openToast('error', err);
                    reject(err);
                });
        });
    };

    const doGetMessages = (data) => {
        return new Promise(async (resolve, reject) => {
            setLoader(true);
            // console.log(data)
            logCrashlytics('Getting Messages....');
            getMessages(data)
                .then((ret) => {
                    // console.log(ret)
                    setLoader(false);
                    setMessages(ret);
                    resolve(ret);
                })
                .catch((err) => {
                    openToast('error', err);
                    logErrorOnCrashlytics(err);
                    setLoader(false);
                    reject(err);
                });
        });
    };

    const doUpdateMessage = useCallback((data) => {
        return new Promise(async (resolve, reject) => {
            setLoader(true);
            logCrashlytics('Updating Message....');
            updateMessage(data)
                .then((ret) => {
                    setLoader(false);
                    resolve(ret);
                })
                .catch((err) => {
                    openToast('error', err);
                    logErrorOnCrashlytics(err);
                    setLoader(false);
                    reject(err);
                });
        });
    }, []);

    const doDeleteMessage = useCallback((data) => {
        return new Promise(async (resolve, reject) => {
            setLoader(true);
            logCrashlytics('Deleting Message....');
            deleteMessage(data)
                .then((ret) => {
                    setLoader(false);
                    resolve(ret);
                })
                .catch((err) => {
                    openToast('error', err);
                    logErrorOnCrashlytics(err);
                    setLoader(false);
                    reject(err);
                });
        });
    }, []);

    const doSendMessage = (data) => {
        return new Promise(async (resolve, reject) => {
            socket.emit('message', data);
            resolve();
        });
    };

    return (
        <MatchContext.Provider
            value={{
                matches,
                messages,
                user,
                doAddMatch,
                setUser,
                doGetMatches,
                doGetMessages,
                doDeleteMessage,
                doUpdateMessage,
                doSendMessage,
            }}>
            {children}
        </MatchContext.Provider>
    );
};
