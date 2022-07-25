import {PusherEvent, PusherMember} from '@pusher/pusher-websocket-react-native';
import React from 'react';
import {MemberEvent} from '../types/memberEvent';
import {MessageEvent} from '../types/messageEvent';
import {User} from '../types/user';
import uuid from 'react-native-uuid';

export type EventType = MessageEvent | MemberEvent;

type EventContextType = {
  events: EventType[];
  setEvents: React.Dispatch<React.SetStateAction<EventType[]>>;
};
const EventsContext = React.createContext<EventContextType>({
  events: [],
  setEvents: () => {},
});

type Props = {children: React.ReactElement};
const EventsProvider = ({children}: Props) => {
  const [events, setEvents] = React.useState<EventType[]>([]);
  const value = React.useMemo(() => ({events, setEvents}), [events]);

  return (
    <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
  );
};

export default EventsProvider;

export const useEvents = () => {
  const {events, setEvents} = React.useContext(EventsContext);

  const addMemberEventFromChannel = React.useCallback(
    (member: PusherMember, status: 'connected' | 'disconnected') => {
      setEvents(_events => [
        ..._events,
        {
          id: uuid.v4() as string,
          type: 'member',
          status,
          member: {id: member.userId, name: member.userInfo.name} as User,
        } as MemberEvent,
      ]);
    },
    [setEvents],
  );

  const addEvent = React.useCallback(
    (event: EventType) => {
      setEvents(_events => [..._events, event]);
    },
    [setEvents],
  );

  const addEventFromChannel = React.useCallback(
    (event: PusherEvent) => {
      const data: EventType = JSON.parse(event.data);
      setEvents(_events => [..._events, data]);
    },
    [setEvents],
  );

  return {
    events,
    addMemberEventFromChannel,
    addEvent,
    addEventFromChannel,
  };
};
