import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Home } from './Home';
import { Event } from 'pages/event/Event';

// import { ResponsiveAppBar } from './components/navigation-bar/ResponsiveAppBar';
// import { BottomBar } from 'components/bottom-bar/BottomBar';
import { GlobalContextProvide } from './global-context';
import './App.scss';
import { ExploreEventsMap } from 'pages/explore-events-map/ExploreEventsMap';
import { Requests } from 'pages/request/Requests';
import { Login } from 'pages/auth/Login';

function App() {
    const darkTheme = createTheme({
        // typography: {
        //     fontFamily: 'Roboto'
        // },
        palette: {
            primary: {
                main: '#0A3200'
            },
            secondary: {
                main: '#114b5f'
            },
            tertiary: {
                main: '#FFFFFF'
            },
            error: {
                main: '#da3e52'
            },
            warning: {
                main: '#F2E94E'
            },
            info: {
                main: '#96e6b3' //'#42D9C8'
            }
        }
    });

    return (
        <GlobalContextProvide>
            {/* <ResponsiveAppBar /> */}
            {/* <BottomBar /> */}
            <ThemeProvider theme={darkTheme}>
                <div className="app">
                    {/* DO NOT USE component like bellow in a Switch statement */}
                    <Routes>
                        <Route path="/" exact element={<Home />} />
                        <Route path="/login" exact element={<Login />} />

                        <Route path="/event" exact element={<Event />} />
                        <Route path="/requests" exact element={<Requests />} />

                        <Route
                            path="/explore"
                            exact
                            element={<ExploreEventsMap />}
                        />
                    </Routes>
                </div>
            </ThemeProvider>
        </GlobalContextProvide>
    );
}

export default App;
