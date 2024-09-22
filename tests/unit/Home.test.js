import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Home from '../../pages/Home';  

jest.mock('@expo/vector-icons/Feather', () => 'Feather');

describe('Home Screen', () => {
  const mockNavigate = jest.fn();
  const navigation = { navigate: mockNavigate };

  // Teste básico para verificar a renderização da tela Home
  it('Deve renderizar corretamente a tela Home', () => {
    const { getByText, getByTestId } = render(<Home navigation={navigation} />);

    // Verifica se o texto principal está sendo renderizado corretamente
    expect(getByText('A melhor ferramenta para gerenciar o seu estoque de forma inteligente!')).toBeTruthy();
    expect(getByText('Entrar na conta SisGeps')).toBeTruthy();
    expect(getByText('Clique para acessar ou criar sua conta SisGeps')).toBeTruthy();
  });

  // Testa a navegação para a tela de Authentication ao clicar no botão
  it('Deve navegar para a tela de Authentication ao clicar no botão Entrar', () => {
    const { getByText } = render(<Home navigation={navigation} />);

    const button = getByText('Entrar na conta SisGeps');
    fireEvent.press(button);

    expect(mockNavigate).toHaveBeenCalledWith('Authentication');
  });

  // Verifica se os ícones de redes sociais estão presentes
  it('Deve renderizar os ícones de redes sociais corretamente', () => {
    const { getByTestId } = render(<Home navigation={navigation} />);

    // Verifica se os ícones de Instagram, Facebook e YouTube estão renderizados
    expect(getByTestId('instagram-icon')).toBeTruthy();
    expect(getByTestId('facebook-icon')).toBeTruthy();
    expect(getByTestId('youtube-icon')).toBeTruthy();
  });
});
