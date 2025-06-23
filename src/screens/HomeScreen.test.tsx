import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import { useUserStore } from '../store/userStore';

jest.mock('../store/userStore', () => ({
  useUserStore: jest.fn(),
}));

import { useUserStore as mockedUseUserStore } from '../store/userStore';

describe('HomeScreen', () => {
  it('debe mostrar usuarios si ya fueron cargados', () => {
    mockedUseUserStore.mockReturnValue({
      users: [{ id: 1, name: 'Mock User', email: 'mock@example.com' }],
      loading: false,
      fetchUsers: jest.fn(),
    });

    const { getByText } = render(
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    );

    expect(getByText('Mock User')).toBeTruthy();
    expect(getByText('mock@example.com')).toBeTruthy();
  });
});
