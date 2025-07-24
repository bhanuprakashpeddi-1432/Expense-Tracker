import { useState, useEffect, createContext } from 'react';
import { dummyUser } from '../data/dummyData';

// Create the context
const AuthContext = createContext();

// Export the context
export { AuthContext };

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing auth token
    const token = localStorage.getItem('token');
    if (token) {
      setUser(dummyUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email === 'admin@example.com' && credentials.password === 'password123') {
          localStorage.setItem('token', 'dummy-token');
          setUser(dummyUser);
          resolve({ success: true });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const register = async (userData) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = { ...dummyUser, name: userData.name, email: userData.email };
        localStorage.setItem('token', 'dummy-token');
        setUser(newUser);
        resolve({ success: true });
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
