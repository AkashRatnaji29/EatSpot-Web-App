import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// 1. Define the type/interface for our context state
interface AuthContextType {
  isLoggedIn: boolean;
  username: string | null;
  login: (token: string, username: string) => void;
  logout: () => void;
}

// Default value for the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 2. The Provider Component Props
interface AuthProviderProps {
  children: ReactNode;
}

// 3. The Provider Component (Manages state and local storage)
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => { // <-- EXPORT IS HERE
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  // Check local storage on initial load to restore session
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if (token && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  // Function to handle successful login
  const login = (token: string, user: string) => {
    localStorage.setItem('token', token); // Store token for future requests
    localStorage.setItem('username', user);
    setIsLoggedIn(true);
    setUsername(user);
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. Custom hook for easy access to the context
export const useAuth = () => { // <-- EXPORT IS HERE
  const context = useContext(AuthContext);
  if (context === undefined) {
    // This error indicates the component using useAuth is not wrapped in AuthProvider
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};