import moment from 'moment';
import React from 'react';
import {StyleSheet} from 'react-native';
import {DarkTheme, DefaultTheme, Surface, Text} from 'react-native-paper';
import {useAuth} from '../context/Authentication';
import {MessageEvent} from '../types/messageEvent';

type Props = {
  event: MessageEvent;
};

const MessageBubble = ({event}: Props) => {
  const {user} = useAuth();

  if (!user) {
    return <></>;
  }

  const isSender = user.id === event.sender.id;

  return (
    <Surface
      style={[
        styles.messageBubble,
        isSender ? styles.selfMessage : styles.otherMessage,
      ]}>
      <Text style={styles.message}>{event.message}</Text>
      <Text style={styles.statusText}>
        {!isSender && `Sent by ${event.sender.name}`}{' '}
        {moment(event.timestamp).fromNow()}
      </Text>
    </Surface>
  );
};

const styles = StyleSheet.create({
  messageBubble: {
    width: 'auto',
    padding: 10,
    paddingBottom: 6,
    margin: 8,
    borderRadius: 8,
    backgroundColor: DarkTheme.colors.surface,
    maxWidth: '80%',
    minWidth: '35%',
  },
  selfMessage: {
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: DefaultTheme.colors.primary,
    alignSelf: 'flex-start',
  },
  message: {
    fontSize: 16,
    fontWeight: DefaultTheme.fonts.medium.fontWeight,
    color: '#fff',
  },
  statusText: {
    marginTop: 2,
    color: '#cdcdcd',
    fontWeight: DefaultTheme.fonts.light.fontWeight,
    fontSize: 12,
    alignSelf: 'flex-end',
  },
});

export default React.memo(MessageBubble);
