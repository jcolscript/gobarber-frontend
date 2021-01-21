import React from 'react';
import { getByTestId, render } from '@testing-library/react';

import Button from '../../components/Button';

describe('Button component', () => {
  it('should be able to render button', () => {
    const { getByTestId } = render(<Button loading={true} />);

    expect(getByTestId('btn')).toBeTruthy();
  });

  it('should be able to change text when loading', () => {
    const { getByText } = render(<Button loading={true} />);

    expect(getByText('Carregando')).toBeTruthy();
  });
});
