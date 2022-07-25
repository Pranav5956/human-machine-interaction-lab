import React from 'react';
import {Provider as PaperProvider, DarkTheme} from 'react-native-paper';
import AppBar from './components/AppBar';
import AuthenticationArea from './components/AuthenticationArea';
import ChatArea from './components/ChatArea';
import AuthenticationProvider, {useAuth} from './context/Authentication';
import EventsProvider from './context/Events';
import PresenceProvider from './context/Presence';
import TypingProvider from './context/Typing';

const AppViewComponent = () => {
  const {isAuthenticated} = useAuth();

  const View = () => (isAuthenticated ? <ChatArea /> : <AuthenticationArea />);

  return (
    <>
      <AppBar />
      <View />
    </>
  );
};

const App = () => {
  return (
    <PaperProvider theme={DarkTheme}>
      <AuthenticationProvider>
        <PresenceProvider>
          <EventsProvider>
            <TypingProvider>
              <AppViewComponent />
            </TypingProvider>
          </EventsProvider>
        </PresenceProvider>
      </AuthenticationProvider>
    </PaperProvider>
  );
};

export default App;
