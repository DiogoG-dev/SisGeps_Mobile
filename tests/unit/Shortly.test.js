import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import Shortly from '../../pages/Shortly';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

test('Deve renderizar o componente corretamente', async () => {
  AsyncStorage.getItem.mockResolvedValue('mocked_user');

  const { getByTestId } = render(<Shortly />);

  expect(getByTestId('logoMarca_SISGEPS')).toBeTruthy();

  await waitFor(() => {
    expect(getByTestId('shortly-text')).toHaveTextContent('Em Breve!');
  });
});

test('Deve lidar com a busca AsyncStorage', async () => {

  AsyncStorage.getItem.mockResolvedValue('mocked_user');

  const { getByTestId } = render(<Shortly />);

  await waitFor(() => {
    expect(getByTestId('shortly-text')).toHaveTextContent('Em Breve!');
  });
});
