import React from 'react';
import { getByTestId, render } from '@testing-library/react';

import Button from '../../components/Button';

describe('Button component', () => {
  it('should be able to render button', () => {
    const { getByText } = render(<Button loading={true} />);

    expect(getByText('Carregando')).toBeTruthy();
  });
});
