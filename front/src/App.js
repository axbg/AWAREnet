import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Home } from './Home';
import { Event } from 'pages/event/Event';

// import { ResponsiveAppBar } from './components/navigation-bar/ResponsiveAppBar';
// import { BottomBar } from 'components/bottom-bar/BottomBar';
import { GlobalContextProvide } from './global-context';
import './App.scss';
import { Requests } from 'pages/request/Requests';
import { Login } from 'pages/auth/Login';
import { Dashboard } from 'pages/Dashboard/Dashboard';
import { EventHistory } from 'pages/EventHistory/EventHistory';
import { Actions } from 'pages/action/Actions';
import { AddEvent } from 'pages/add-event/AddEvent';
import { MobileLayout } from 'layouts/MobileLayout';
import { ExploreEvents } from 'pages/explore-events/ExploreEvents';
import { DesktopLayout } from 'layouts/DesktopLayout';
import { CompaniesLeaderboard } from 'pages/leaderboard/CompaniesLeaderboard';

function App() {
    const darkTheme = createTheme({
        typography: {
            fontFamily: '"Helvetica Neue"'
        },
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
                    {/* TODO: according to user role, this is just temporary */}
                    <Routes>
                        <Route path="/" exact element={<Home />} />
                        <Route path="/login" exact element={<Login />} />

                        <Route element={<DesktopLayout />}>
                            <Route path="/event" exact element={<Event />} />
                        </Route>
                        <Route element={<DesktopLayout />}>
                            <Route
                                path="/requests"
                                exact
                                element={<Requests />}
                            />
                        </Route>

                        <Route path="/actions" exact element={<Actions />} />
                        <Route element={<DesktopLayout />}>
                            <Route
                                path="/add-event"
                                exact
                                element={<AddEvent />}
                            />
                        </Route>
                        <Route element={<MobileLayout />}>
                            <Route
                                path="/dashboard"
                                exact
                                element={<Dashboard />}
                            />
                            <Route
                                path="/explore"
                                exact
                                element={<ExploreEvents />}
                            />
                            <Route
                                path="/leaderboard"
                                exact
                                element={<CompaniesLeaderboard />}
                            />
                            <Route
                                path="/event-history"
                                exact
                                element={<EventHistory />}
                            />
                        </Route>
                    </Routes>
                </div>
            </ThemeProvider>
        </GlobalContextProvide>
    );
}

export default App;
