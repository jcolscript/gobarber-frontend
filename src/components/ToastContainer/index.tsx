import React from 'react';

import { Container } from './styles';

import Toast from './Toast';

interface ToastMessage {
  id: string;
  type?: 'sucess' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ToastMessageContainer {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastMessageContainer> = ({ messages }) => {
  return (
    <Container>
      {messages.map(message => (
        <Toast key={message.id} message={message} />
      ))}
    </Container>
  );
};

export default ToastContainer;
