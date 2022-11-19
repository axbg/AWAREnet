import React, { useEffect } from 'react';
import { addUser, useGlobalContext } from '../../global-context';

export const Login = () => {
    const { dispatch } = useGlobalContext();

    useEffect(() => {
        console.log('here');
        dispatch(addUser({ userId: '2345678', role: 'NGO' }));
    }, []);
    return <div>HELO</div>;
};
