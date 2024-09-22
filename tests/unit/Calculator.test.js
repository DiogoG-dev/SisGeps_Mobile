import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Calculator from '../../pages/Calculator';

describe('Componente de calculadora', () => {
  it('Deve renderizar o componente corretamente', () => {
    const { getByTestId } = render(<Calculator />);

    expect(getByTestId('button-0')).toBeTruthy();
    expect(getByTestId('button-8')).toBeTruthy();
    expect(getByTestId('button-9')).toBeTruthy();
    expect(getByTestId('button-divide')).toBeTruthy();
    expect(getByTestId('button-multiply')).toBeTruthy();
    expect(getByTestId('button-subtract')).toBeTruthy();
    expect(getByTestId('button-add')).toBeTruthy();
    expect(getByTestId('button-equal')).toBeTruthy();
    expect(getByTestId('button-delete')).toBeTruthy();
    expect(getByTestId('result-text')).toBeTruthy();
  });

  it('Deve atualizar a entrada quando os botões são pressionados', () => {
    const { getByTestId } = render(<Calculator />);

    fireEvent.press(getByTestId('button-1'));
    fireEvent.press(getByTestId('button-add'));
    fireEvent.press(getByTestId('button-3'));
    fireEvent.press(getByTestId('button-equal'));
  
    expect(getByTestId('result-text').props.children).toBe('4');
  });

  it('Deve calcular o resultado corretamente', () => {
    const { getByTestId } = render(<Calculator />);

    fireEvent.press(getByTestId('button-7'));
    fireEvent.press(getByTestId('button-multiply'));
    fireEvent.press(getByTestId('button-3'));
    fireEvent.press(getByTestId('button-equal'));

    expect(getByTestId('result-text').props.children).toBe('21');
  });

  it('Deve lidar com expressões inválidas', () => {
    const { getByTestId } = render(<Calculator />);

    fireEvent.press(getByTestId('button-1'));
    fireEvent.press(getByTestId('button-divide'));
    fireEvent.press(getByTestId('button-0'));
    fireEvent.press(getByTestId('button-equal'));
  
    expect(getByTestId('result-text').props.children).toBe('Error');
  });

  it('Deve limpar a entrada e o resultado quando o botão delete for pressionado', () => {
    const { getByTestId } = render(<Calculator />);

    fireEvent.press(getByTestId('button-7'));
    fireEvent.press(getByTestId('button-delete'));
  
    expect(getByTestId('result-text').props.children).toBe(0);
  });
});
