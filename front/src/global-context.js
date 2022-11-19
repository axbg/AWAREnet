import * as React from 'react';
const GlobalContext = React.createContext();

const initialState = {
    count: 0,
    user: JSON.parse(localStorage.getItem('userDetails')) || {}
};

const ACTIONS = {
    ADD_USER: 'addUserData'
};

//todo add a actions.js file into a global-context directory
export const addUser = (user) => ({
    type: ACTIONS.ADD_USER,
    user
});

function storeReducer(state = initialState, action) {
    switch (action.type) {
        case ACTIONS.ADD_USER: {
            console.log('here', action);
            localStorage.setItem('user', JSON.stringify(action.user));
            return {
                ...state,
                user: action.user
            };
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

function GlobalContextProvide({ children }) {
    const [state, dispatch] = React.useReducer(storeReducer, initialState);
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
