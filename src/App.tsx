import React from 'react';

import AppProvider from './context';

import GlobalStyle from './styles/global';

import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';

const App: React.FC = () => {
  return (
    <>
      <AppProvider>
        <SignIn />
      </AppProvider>
      <GlobalStyle />
    </>
  );
};

export default App;
