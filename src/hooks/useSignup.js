import { useContext, useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from '../api/api';
import { AuthContext } from '../context/AuthContext';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const { user, dispatch } = useAuthContext();
  const { isLoading, setIsLoading } = useContext(AuthContext)


  const signup = async (username, password, name, lastname, number, subject) => {
    setIsLoading(true);
    setError(null);
    console.log("username: ", username)
    console.log("lastname: ", lastname)
    console.log("password: ", password)
    console.log("number: ", number)
    console.log("subject: ", subject)
    console.log("name: ", name)

    if (!user.role === "root" || !username || !lastname || !password || !number || !subject || !name) {
      alert("user root admin bolishi kerak")
    } else {
      try {
        const response = await axios.post('/user/register', {
          username, password, name, lastname, number, subject
        }, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });

        if (response.status !== 200) {
          setIsLoading(false);
          setError(response.data.error);
        } else {
          const json = response.data;

          // Save the user to local storage
          localStorage.setItem('user', JSON.stringify(json));

          // Update the auth context
          dispatch({ type: 'LOGIN', payload: json });

          // Update loading state
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        setError('An error occurred during signup.');
      }
    }

  };

  return { signup, isLoading, error };
};
