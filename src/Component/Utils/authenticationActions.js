// authenticationActions.js
import { useNavigate } from 'react-router-dom';
import { setToken, setUser, errormsg, isSignup } from './authenticationSlice';
import axios from 'axios';

export const signup = (userData) => async (dispatch) => {

    try {
        const response = await axios.post('https://dnyanodaya-backend-1.vercel.app/ntune-user/signup', userData);
        dispatch(setToken(response.data.token));
        dispatch(setUser(response.data.user));
        dispatch(isSignup(true))

    } catch (error) {
        dispatch(errormsg(error.response.data.error));
    }
};
export const logout = () => ({
    type: 'LOGOUT',
});

export const login = (userData) => async (dispatch) => {
    const username = userData.username
    const password = userData.password
    try {
        const response = await fetch('http://localhost:3001/ntune-user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const responseData = await response.json(); // Parse the response body as JSON

        console.log("Login data:", responseData);
        if (response.ok) {
            console.log("Login data:", responseData);
            dispatch(setToken(responseData.token));
            dispatch(setUser(responseData));
        }
        else {
            // Handle error cases 
            dispatch(errormsg(responseData));

            console.log("Login failed:", responseData);
        }

        // Return a success indicator or data, if needed
        return response.data;
    } catch (error) {
        // Handle login failure or errors
        throw error; // You can throw an error to indicate login failure
    }
};