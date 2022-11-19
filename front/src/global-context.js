import * as React from 'react';
const GlobalContext = React.createContext();

const initialState = {
    count: 0
};
const ACTIONS = {};

//todo add a actions.js file into a global-context directory
// export const addUserId = (userId) => ({
//     type: ACTIONS.ADD_USER_ID,
//     userId
// });

function storeReducer(state = initialState, action) {
    switch (action.type) {
        case ACTIONS.ADD_USER_ID: {
            localStorage.setItem('userId', action.userId);
            return {
                ...state,
                userId: action.userId
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
