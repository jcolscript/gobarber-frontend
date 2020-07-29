import React from 'react';

import GlobalStyle from './styles/global';

import Signin from './pages/SignIn';

const App: React.FC = () => {
  return (
    <>
      <Signin />
      <GlobalStyle />
    </>
  );
};

export default App;
