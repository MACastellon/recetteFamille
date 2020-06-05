import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import axios from "axios";

const AuthContext = React.createContext();


const AuthProvider = props => {
    const AUTH_URL = "http://localhost:5000/users/login";
    const TOKEN_NAME = 'POST_TOKEN';

    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState('');
    const history = useHistory();

    useEffect(() => {
        const user = extractUser();
        if (user) {
            setToken(localStorage.getItem(TOKEN_NAME));
            setCurrentUser(user);
        }
    }, [])


    const login = async(data) => {
        axios.post(AUTH_URL , data)
            .then((res) => {
                console.log(res.data)
                saveToken(res.data.token);
                const user = extractUser();
                if (user) {
                    setToken(data.token);
                    setCurrentUser({...user});
                }
            })
    };

    const extractUser = () => {
        const token = localStorage.getItem(TOKEN_NAME);
        if (!token) {
            return null;
        }
        const tokenObj = JSON.parse(atob(token.split('.')[1]));

        return tokenObj;
    };

    const saveToken = (token) => {
        localStorage.setItem(TOKEN_NAME, token);
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_NAME);
        setCurrentUser(null);
        history.replace('/');
    };

    const value = {loginFn: login, currentUser, logoutFn: logout, token};

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
};

const AuthConsumer = AuthContext.Consumer;

export {AuthProvider, AuthConsumer};
export default AuthContext;
