import { useMemo, useState, type ReactNode } from 'react';
import { login as loginRequest, type AuthUser } from '../../api/auth';
import { AuthContext, type AuthContextValue } from './auth-context';
const tokenKey = 'shiftflow_token';
const userKey = 'shiftflow_user';

const readUser = (): AuthUser | null => {
  try {
    const value = localStorage.getItem(userKey);
    return value ? JSON.parse(value) as AuthUser : null;
  } catch {
    return null;
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState(() => localStorage.getItem(tokenKey));
  const [user, setUser] = useState<AuthUser | null>(readUser);
  const value = useMemo<AuthContextValue>(() => ({
    token,
    user,
    async login(email, password) {
      const session = await loginRequest(email, password);
      localStorage.setItem(tokenKey, session.token);
      localStorage.setItem(userKey, JSON.stringify(session.user));
      setToken(session.token);
      setUser(session.user);
    },
    logout() {
      localStorage.removeItem(tokenKey);
      localStorage.removeItem(userKey);
      setToken(null);
      setUser(null);
    },
  }), [token, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
