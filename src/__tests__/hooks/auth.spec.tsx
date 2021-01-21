import { renderHook, act } from '@testing-library/react-hooks';
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

  it('should restore saved data from storage when auth inits', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@Gobarber:token':
          return 'abc-def-ghi';
        case '@Gobarber:user':
          return JSON.stringify({
            id: 'user-abc-123',
            name: 'Teste Teste',
            email: 'teste@teste.com.br',
          });
        default:
          return null;
      }
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user?.email).toEqual('teste@teste.com.br');
  });

  it('should be able to sign out', async () => {
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(key => {
      switch (key) {
        case '@Gobarber:token':
          return 'abc-def-ghi';
        case '@Gobarber:user':
          return JSON.stringify({
            id: 'user-abc-123',
            name: 'Teste Teste',
            email: 'teste@teste.com.br',
          });
        default:
          return null;
      }
    });

    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signOut();
    });

    expect(removeItemSpy).toBeCalledTimes(2);
    expect(result.current.user).toBeUndefined();
  });

  it('should be able to update user data', async () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    const user = {
      id: 'user-abc-123',
      name: 'Teste Teste',
      email: 'teste@teste.com.br',
      avatar_url: 'image.jpg',
      avatar: 'abc123',
      created_at: '2019-09-09',
      updated_at: '2019-09-09',
    };

    act(() => {
      result.current.updateUser(user);
    });

    expect(setItemSpy).toBeCalledWith('@Gobarber:user', JSON.stringify(user));
    expect(result.current.user).toEqual(user);
  });
});
