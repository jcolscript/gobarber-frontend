import React from 'react';
import { FiPower } from 'react-icons/fi';

import { Container, Header, HeaderContent, Profile } from './styles';

import logoImg from '../../assets/logo.svg';
import defaultAvatar from '../../assets/default-avatar.png';
import { useAuth } from '../../context/AuthContext';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="Logo GoBarber" />
          <Profile>
            <img
              src={user?.avatar_url ? user?.avatar_url : defaultAvatar}
              alt={user?.name}
            />
            <div>
              <span>Bem vindo</span>
              <strong>{user?.name}</strong>
            </div>
          </Profile>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
    </Container>
  );
};

export default Dashboard;
