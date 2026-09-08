import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, senha, tipo) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const mockUser = {
        id: 1,
        nome: email.split('@')[0],
        email,
        tipo: tipo || 'cliente',
        comunidade: 'Morro do Alemão',
      };
      setUser(mockUser);
      await AsyncStorage.setItem('@quentinhas_user', JSON.stringify(mockUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Erro ao fazer login' };
    } finally {
      setLoading(false);
    }
  };

  const registrar = async (dados) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const mockUser = {
        ...dados,
        id: 1,
        tipo: dados.tipo || 'cliente',
      };
      setUser(mockUser);
      await AsyncStorage.setItem('@quentinhas_user', JSON.stringify(mockUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Erro ao cadastrar' };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('@quentinhas_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, registrar, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
