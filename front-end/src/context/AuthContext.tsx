// frontend/src/context/AuthContext.tsx

import React, { useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './auth-context';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));
  const navigate = useNavigate();

  const login = (newToken: string) => {
    localStorage.setItem('authToken', newToken);
    setToken(newToken);
    window.location.href = '/admin'; // Força recarregamento para garantir que tudo seja atualizado
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
