'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  error: Error | null;
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  error: null,
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simulate fetching user data
    const timer = setTimeout(() => {
      try {
        setUser({
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://example.com/avatar.jpg'
        });
        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, error }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);