import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type IButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<IButtonProps> = ({ children, loading, ...rest }) => (
  <Container type="button" data-testid="btn" {...rest}>
    {loading ? 'Carregando' : children}
  </Container>
);

export default Button;
