import React, { createContext, useCallback } from 'react';
import client from '../infra/services/client';

interface SignInCredentials {
  email: string;
  password: string;
}

interface IAuthContext {
  name?: string;
  signIn(credentials: SignInCredentials): Promise<void>;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const signIn = useCallback(async ({ email, password }) => {
    const response = await client.post('sessions', {
      email,
      password,
    });

    console.log(response.data);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        name: 'José',
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
