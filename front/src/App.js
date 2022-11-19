import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Home } from './Home';
import { ResponsiveAppBar } from './components/navigation-bar/ResponsiveAppBar';
import { GlobalContextProvide } from './global-context';
import './App.scss';

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
            <ResponsiveAppBar />
            <ThemeProvider theme={darkTheme}>
                <div className="app">
                    {/* DO NOT USE component like bellow in a Switch statement */}
                    <Routes>
                        <Route path="/" exact element={<Home />} />
                    </Routes>
                </div>
            </ThemeProvider>
        </GlobalContextProvide>
    );
}

export default App;
