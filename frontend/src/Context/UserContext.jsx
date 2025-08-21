import React, { createContext, useEffect, useState, useContext } from 'react';
import { authDataContext } from './AuthContext';
import axios from 'axios';

export const userDataContext = createContext();

function UserContext({ children }) {
  const { serverUrl } = useContext(authDataContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/me`, {
        withCredentials: true,
      });

      const user = result.data;
      user.isAdmin = user.isAdmin === true || user.role === "admin"; // Safety check
      setUserData(user);
      return user;
    } catch (error) {
      console.error("Error fetching user:", error);
      setUserData(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const value = {
    userData,
    setUserData,
    getCurrentUser,
    loading,
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
