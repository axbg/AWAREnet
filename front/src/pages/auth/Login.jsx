import React, { useEffect } from 'react';
import { addUser, useGlobalContext } from '../../global-context';
import { Grid, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import illustration from 'assets/join-login.svg';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const { dispatch } = useGlobalContext();

    useEffect(() => {
        console.log('here');
        dispatch(addUser({ userId: '2345678', role: 'NGO' }));
    }, []);

    const goToRegister = () => {
        navigate('/register', { replace: false });
    };

    const goToDashboard = () => {
        //handle login
        axios.post('/login').then((res) => {
            console.log(res);
        });
        navigate('/', { replace: false });
    };

    return (
        <div className="login-container">
            <img src={illustration} alt="avatar" className="login-img" />
            <Grid item xs={6} pl={0}>
                <h1 className="page-title">{'Login'}</h1>
                <div className="login-inputs">
                    <TextField label="Email" />
                    <TextField label="Password" type="password" />
                </div>
                <div className="login-buttons">
                    <Button
                        sx={{ textTransform: 'none', marginRight: '0px' }}
                        variant="outlined"
                        onClick={goToDashboard}>
                        {"Let's go"}
                    </Button>
                    <Button
                        sx={{ textTransform: 'none' }}
                        variant="outlined"
                        color="secondary"
                        onClick={goToRegister}>
                        Create an account
                    </Button>
                </div>
            </Grid>
        </div>
    );
};

export { Login };
