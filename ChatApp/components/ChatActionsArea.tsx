import React from 'react';
import {StyleSheet} from 'react-native';
import {IconButton, Surface, TextInput} from 'react-native-paper';
import {useAuth} from '../context/Authentication';
import {useEvents} from '../context/Events';
import {MessageEvent} from '../types/messageEvent';
import {TypingEvent} from '../types/typing';
import {createMessageEvent, createTypingEvent} from '../utils/events';

type Props = {
  triggerMessage: (event: MessageEvent) => void;
  triggerTyping: (event: TypingEvent) => void;
};

const ChatActionsArea = ({triggerMessage, triggerTyping}: Props) => {
  const [message, setMessage] = React.useState('');
  const {user} = useAuth();
  const {addEvent} = useEvents();

  const onSend = () => {
    if (message === '') {
      return;
    }

    const event = createMessageEvent(message, user!);
    triggerMessage(event);
    addEvent(event);
    setMessage('');
  };

  const onFocus = () => {
    const event = createTypingEvent(user!, true);
    triggerTyping(event);
  };

  const onBlur = () => {
    const event = createTypingEvent(user!, false);
    triggerTyping(event);
  };

  return (
    <Surface style={styles.chatActionsArea}>
      <TextInput
        style={styles.chatActionInput}
        placeholder="Enter a message"
        dense
        mode="outlined"
        value={message}
        onChangeText={setMessage}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <IconButton icon="send" centered onPress={onSend} />
    </Surface>
  );
};

const styles = StyleSheet.create({
  chatActionsArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatActionInput: {
    flex: 1,
    margin: 8,
  },
});

export default ChatActionsArea;
