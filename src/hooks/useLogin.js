import { useContext, useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from '../api/api';
import { AuthContext } from '../context/AuthContext';

export const useLogin = () => {
  const [error, setError] = useState(null);
  // const [isLoading, setIsLoading] = useState(null);
  const { isLoading, setIsLoading } = useContext(AuthContext)

  const { dispatch } = useAuthContext();

  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);
    console.log(username)
    console.log(password)
    // console.log(password)
    try {
      const response = await axios.post('/auth/login', {
        username,
        password
      });
      if (response.status !== 200) {
        setIsLoading(false);
        setError(response.data.error);
      } else {
        const json = response.data;
        console.log(json)

        // Save the user to local storage
        localStorage.setItem('user', JSON.stringify(json));

        // Update the auth context
        dispatch({ type: 'LOGIN', payload: json });

        // Update loading state
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError('Sizga saytga kirish uchun hali ruxsat yo`q');
    }
  };

  return { login, isLoading, error };
};
