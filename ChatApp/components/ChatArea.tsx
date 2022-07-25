import {Pusher, PusherEvent} from '@pusher/pusher-websocket-react-native';
import React from 'react';
import {useAuth} from '../context/Authentication';
import {
  pusherAPIKey,
  pusherCluster,
  pusherOnAuthorizer,
} from '../pusher.config';
import ChatActionsArea from './ChatActionsArea';
import ChatMessagesArea from './ChatMessagesArea';
import {MessageEvent} from '../types/messageEvent';
import {useEvents} from '../context/Events';
import {usePresence} from '../context/Presence';
import ChatStatusBar from './ChatStatusBar';
import {createMemberEvent} from '../utils/events';
import {TypingEvent} from '../types/typing';
import {useTyping} from '../context/Typing';

const pusher = Pusher.getInstance();

const ChatArea = () => {
  const {user} = useAuth();
  const {addEventFromChannel, addMemberEventFromChannel, addEvent} =
    useEvents();
  const {initializePresence, addPresence, removePresence} = usePresence();
  const {handleTypingFromChannel, removeTypingOnMemberRemoved} = useTyping();

  React.useEffect(() => {
    if (!user) {
      return;
    }

    (async () => {
      if (pusher.connectionState !== 'CONNECTED') {
        try {
          await pusher.init({
            apiKey: pusherAPIKey,
            cluster: pusherCluster,
            onAuthorizer: pusherOnAuthorizer(user),
          });
        } catch (e) {}
      }

      await pusher.connect();
    })();

    return () => {
      pusher.disconnect();
    };
  }, [user]);

  React.useEffect(() => {
    (async () => {
      await pusher.subscribe({
        channelName: 'private-chat',
        onEvent: (event: PusherEvent) => {
          if (event.eventName === 'client-typing') {
            handleTypingFromChannel(event);
          } else {
            addEventFromChannel(event);
          }
        },
      });
    })();

    return () => {
      pusher.unsubscribe({channelName: 'private-chat'});
    };
  }, [addEventFromChannel, handleTypingFromChannel]);

  React.useEffect(() => {
    (async () => {
      await pusher.subscribe({
        channelName: 'presence-chat',
        onMemberAdded: member => {
          addMemberEventFromChannel(member, 'connected');
          addPresence();
        },
        onMemberRemoved: member => {
          addMemberEventFromChannel(member, 'disconnected');
          removePresence();
          removeTypingOnMemberRemoved(member.userId);
        },
        onSubscriptionSucceeded: data => {
          initializePresence(data.presence.count || 0);
          addEvent(createMemberEvent(user!, 'connected'));
        },
      });
    })();

    return () => {
      pusher.unsubscribe({channelName: 'presence-chat'});
    };
  }, [
    user,
    addMemberEventFromChannel,
    initializePresence,
    addPresence,
    removePresence,
    addEvent,
    removeTypingOnMemberRemoved,
  ]);

  const triggerMessage = async (event: MessageEvent) => {
    await pusher.trigger({
      channelName: 'private-chat',
      eventName: 'client-message',
      data: JSON.stringify(event),
    });
  };

  const triggerTyping = async (event: TypingEvent) => {
    await pusher.trigger({
      channelName: 'private-chat',
      eventName: 'client-typing',
      data: JSON.stringify(event),
    });
  };

  return (
    <>
      <ChatMessagesArea />
      <ChatStatusBar />
      <ChatActionsArea
        triggerMessage={triggerMessage}
        triggerTyping={triggerTyping}
      />
    </>
  );
};

export default ChatArea;
