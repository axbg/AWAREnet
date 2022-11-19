import * as React from 'react';
import io from 'socket.io-client';

const GlobalContext = React.createContext();
const BACKEND_ENDPOINT = process.env.REACT_APP_BACK_END_URL;
console.log(BACKEND_ENDPOINT);

const initialState = {
    count: 0,
    userId: localStorage.getItem('userId') || 0, // TODO: save as cookie not as this
    socket: io(BACKEND_ENDPOINT),
    //not the best approach
    userDetails: JSON.parse(localStorage.getItem('userDetails')) || {},
    gapi: ''
};
const ACTIONS = {
    ADD_USER_ID: 'addUserId',
    REMOVE_USER_ID: 'removeUserId',
    ADD_USER_DETAILS: 'addUserDetails'
};

//todo add a actions.js file into a global-context directory
export const addUserId = (userId) => ({
    type: ACTIONS.ADD_USER_ID,
    userId
});

export const removeUserId = (userId) => ({
    type: ACTIONS.REMOVE_USER_ID,
    userId
});

export const addUsersDetails = (userDetails) => ({
    type: ACTIONS.ADD_USER_DETAILS,
    userDetails
});

function storeReducer(state = initialState, action) {
    switch (action.type) {
        case ACTIONS.ADD_USER_ID: {
            localStorage.setItem('userId', action.userId);
            return {
                ...state,
                userId: action.userId
            };
        }
        case ACTIONS.REMOVE_USER_ID: {
            // localStorage.removeItem('userId');
            return {
                ...state,
                userId: 0
            };
        }
        case ACTIONS.ADD_USER_DETAILS: {
            localStorage.setItem(
                'userDetails',
                JSON.stringify(action.userDetails)
            );

            return {
                ...state,
                userName: action.user
            };
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

function GlobalContextProvide({ children }) {
    const [state, dispatch] = React.useReducer(storeReducer, initialState);
    React.useEffect(() => {
        initialState.socket.on('connect', () => {
            console.log('Socket connected');
        });
    }, []);

    const value = { state, dispatch };
    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
}

//custom hook
function useGlobalContext() {
    const context = React.useContext(GlobalContext);
    if (context === undefined) {
        throw new Error('useGlobalContext must be used with a Provider');
    }
    return context;
}

export { GlobalContextProvide, useGlobalContext };
