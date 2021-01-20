import { renderHook } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';

import { AuthProvider, useAuth } from '../../infra/hooks/auth';
import client from '../../infra/services/client';

const apiMock = new MockAdapter(client);

describe('Auth hook', () => {
  it('should be able to sign in', async () => {
    const apiResponse = {
      user: {
        id: 'user-abc-123',
        name: 'Teste Teste',
        email: 'teste@teste.com.br',
      },
      token: 'abc-def-ghij',
    };

    apiMock.onPost('sessions').reply(200, apiResponse);

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'teste@teste.com.br',
      password: 'abc123',
    });

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith(
      '@Gobarber:token',
      apiResponse.token,
    );
    expect(setItemSpy).toHaveBeenCalledWith(
      '@Gobarber:user',
      JSON.stringify(apiResponse.user),
    );
    expect(result.current.user?.email).toEqual(apiResponse.user.email);
  });
});
