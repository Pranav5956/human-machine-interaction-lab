import {EventType} from '../context/Events';
import {MemberEvent} from '../types/memberEvent';
import {MessageEvent} from '../types/messageEvent';
import {User} from '../types/user';
import uuid from 'react-native-uuid';
import {TypingEvent} from '../types/typing';

export const isMessageEvent = (event: EventType): event is MessageEvent =>
  event.type === 'message';
export const isMemberEvent = (event: EventType): event is MemberEvent =>
  event.type === 'member';

export const createMessageEvent = (
  message: string,
  sender: User,
): MessageEvent => ({
  id: uuid.v4() as string,
  type: 'message',
  sender,
  message,
  timestamp: Date.now(),
});

export const createMemberEvent = (
  member: User,
  status: 'connected' | 'disconnected',
): MemberEvent => ({
  id: uuid.v4() as string,
  type: 'member',
  status,
  member,
});

export const createTypingEvent = (
  member: User,
  isTyping: boolean,
): TypingEvent => ({
  id: uuid.v4() as string,
  member,
  isTyping,
});
