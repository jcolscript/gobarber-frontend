import React from 'react';
import { FiLogIn, FiMail, FiUser, FiLock, FiArrowLeft } from 'react-icons/fi';

import logo from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => (
  <Container>
    <Background />
    <Content>
      <img src={logo} alt="GoBarber" />

      <form>
        <h1>Criar sua Conta do GoBarber</h1>

        <Input name="name" icon={FiUser} type="text" placeholder="Nome" />
        <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />
        <Input
          name="senha"
          icon={FiLock}
          type="password"
          placeholder="Password"
        />

        <Button type="submit">Cadastrar</Button>
      </form>

      <a href="signup">
        <FiArrowLeft />
        Faça login em vez disso
      </a>
    </Content>
  </Container>
);

export default SignUp;
