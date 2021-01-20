import { renderHook } from '@testing-library/react-hooks';

import { AuthProvider, useAuth } from '../../infra/hooks/auth';

describe('Auth hook', () => {
  it('should be able to sign in', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'teste@teste.com.br',
      password: 'abc123',
    });

    expect(result.current.user?.email).toEqual('teste@teste.com.br');
  });
});
