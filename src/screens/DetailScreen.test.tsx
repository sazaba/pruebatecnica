import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import DetailScreen from './DetailScreen';
import { getUserById } from '../services/userService';
import { useNavigation, useRoute } from '@react-navigation/native';

// Mock de navigation y route
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));

// Mock del servicio
jest.mock('../services/userService');

describe('DetailScreen', () => {
  const mockGoBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useNavigation as jest.Mock).mockReturnValue({ goBack: mockGoBack });
    (useRoute as jest.Mock).mockReturnValue({ params: { userId: 1 } });

    (getUserById as jest.Mock).mockResolvedValue({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      address: {
        street: 'Main St',
        suite: 'Apt 1',
        city: 'New York',
        zipcode: '10001',
      },
      company: {
        name: 'Example Inc.',
        catchPhrase: 'We build the future',
      },
    });
  });

  it('debe mostrar el ActivityIndicator mientras carga', () => {
    const { getByTestId } = render(<DetailScreen />);
    expect(getByTestId('activity-indicator')).toBeTruthy();
  });

  it('debe mostrar los datos del usuario', async () => {
    const { getByText } = render(<DetailScreen />);
    
    await waitFor(() => {
      expect(getByText('John Doe')).toBeTruthy();
      expect(getByText('john@example.com')).toBeTruthy();
      expect(getByText('123-456-7890')).toBeTruthy();
      expect(getByText('Main St, Apt 1, New York, 10001')).toBeTruthy();
      expect(getByText('Example Inc.')).toBeTruthy();
      expect(getByText('We build the future')).toBeTruthy();
    });
  });

  it('debe volver al presionar el botón', async () => {
    const { getByText } = render(<DetailScreen />);

    await waitFor(() => {
      fireEvent.press(getByText('Volver'));
      expect(mockGoBack).toHaveBeenCalled();
    });
  });
});
