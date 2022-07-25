import React from 'react';
import {StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';
import {useAuth} from '../context/Authentication';

const AppBar = () => {
  const {isAuthenticated, user, logoutUser} = useAuth();

  return (
    <Appbar.Header dark style={styles.appBar}>
      <Appbar.Content
        title="Chat Application"
        {...(user && {
          subtitle: `Logged in as ${user.name}!`,
        })}
      />
      {isAuthenticated && <Appbar.Action icon="logout" onPress={logoutUser} />}
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  appBar: {padding: 8},
});

export default AppBar;
