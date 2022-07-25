import React from 'react';
import {FlatList, ListRenderItem, SafeAreaView, StyleSheet} from 'react-native';
import {Surface} from 'react-native-paper';
import {EventType, useEvents} from '../context/Events';
import {isMemberEvent, isMessageEvent} from '../utils/events';
import MemberBubble from './MemberBubble';
import MessageBubble from './MessageBubble';

const ChatMessagesArea = () => {
  const {events} = useEvents();
  const ref = React.createRef<FlatList>();

  const renderItem: ListRenderItem<EventType> = ({item}) => {
    if (isMessageEvent(item)) {
      return <MessageBubble event={item} />;
    }

    if (isMemberEvent(item)) {
      return <MemberBubble event={item} />;
    }

    return <></>;
  };

  return (
    <Surface style={styles.chatMessagesArea}>
      <SafeAreaView>
        <FlatList
          ref={ref}
          data={events}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          onContentSizeChange={() =>
            ref.current && ref.current.scrollToEnd({animated: true})
          }
        />
      </SafeAreaView>
    </Surface>
  );
};

const styles = StyleSheet.create({
  chatMessagesArea: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#333',
  },
});

export default ChatMessagesArea;
