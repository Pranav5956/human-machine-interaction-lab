import React from 'react';
import {StyleSheet} from 'react-native';
import {Chip, Surface, Text} from 'react-native-paper';
import {usePresence} from '../context/Presence';
import {useTyping} from '../context/Typing';

const PresenceChip = React.memo(() => {
  const {presence} = usePresence();
  return (
    <Chip mode="outlined" textStyle={styles.online}>
      {presence} online
    </Chip>
  );
});

const TypingText = React.memo(() => {
  const {typingText} = useTyping();

  return <Text style={styles.typing}>{typingText()}</Text>;
});

const ChatStatusBar = () => {
  return (
    <Surface style={styles.statusBar}>
      <TypingText />
      <PresenceChip />
    </Surface>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    flexDirection: 'row',
    padding: 8,
    paddingBottom: 0,
    alignItems: 'center',
  },
  typing: {
    flex: 1,
    fontSize: 14,
    padding: 8,
    paddingBottom: 0,
  },
  online: {
    color: 'lime',
  },
});

export default React.memo(ChatStatusBar);
