import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

const STORAGE_KEY = 'habitchain_user';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('habitchain_users') || '{}');
    const user = users[email];
    
    if (!user || user.password !== password) {
      throw new Error('Invalid email or password');
    }

    const userData = { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt };
    setUser(userData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  };

  const signup = (name: string, email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('habitchain_users') || '{}');
    
    if (users[email]) {
      throw new Error('User already exists');
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      createdAt: new Date().toISOString()
    };

    users[email] = newUser;
    localStorage.setItem('habitchain_users', JSON.stringify(users));

    const userData = { id: newUser.id, name: newUser.name, email: newUser.email, createdAt: newUser.createdAt };
    setUser(userData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { user, loading, login, signup, logout };
}
