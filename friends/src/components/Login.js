import React, { useState } from 'react';

import { axiosWithAuth } from '../utils/axiosWithAuth';

const Login = props => {
    
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const handleChange = event => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        });
    };

    const login = event => {
        event.preventDefault();
        axiosWithAuth()
            .post("/login", credentials)
            .then(response => {
                localStorage.setItem("token", response.data.payload);
                props.history.push("/protected");
            })
            .catch(error => {
                console.log("Error is:", error);
            });
    };

    return (
        <div>
            <form onSubmit={login}>
                <input
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                />
                <button>Log in</button>
            </form>
        </div>
    );
};

export default Login;