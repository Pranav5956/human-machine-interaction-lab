import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Chip} from 'react-native-paper';
import {useAuth} from '../context/Authentication';
import {MemberEvent} from '../types/memberEvent';

type Props = {
  event: MemberEvent;
};

const MemberBubble = ({event}: Props) => {
  const {user} = useAuth();

  if (!user) {
    return <></>;
  }

  const isUser = event.member.id === user.id;

  return (
    <View style={styles.memberBubble}>
      <Chip mode="outlined">
        {isUser ? `You (${event.member.name})` : `${event.member.name} has`}{' '}
        {event.status === 'connected' ? 'joined' : 'left'} the chat!
      </Chip>
    </View>
  );
};

const styles = StyleSheet.create({
  memberBubble: {
    flexDirection: 'row',
    alignSelf: 'center',
    margin: 12,
  },
});

export default React.memo(MemberBubble);
