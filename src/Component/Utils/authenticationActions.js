// authenticationActions.js
import { setToken, setUser } from './authenticationSlice';
import axios from 'axios';

export const signup = (userData) => async (dispatch) => {
  try {
    const response = await axios.post('/api/signup', userData);
    dispatch(setToken(response.data.token));
    dispatch(setUser(response.data.user));
  } catch (error) {
  }
};
export const logout = () => ({
    type: 'LOGOUT',
  });

export const login = (userData) => async (dispatch) => {
    const username =userData.username
    const password = userData.password
    try {
        const response = await fetch('https://dnyanodaya-backend-1.vercel.app/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username,password  }),
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
        console.log("Login failed:", responseData);
    }
  
      // Return a success indicator or data, if needed
      return response.data;
    } catch (error) {
      // Handle login failure or errors
      throw error; // You can throw an error to indicate login failure
    }
  };