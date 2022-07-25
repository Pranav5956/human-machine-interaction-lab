import {User} from './user';

export type TypingType = User;
export type TypingEvent = {id: string; member: User; isTyping: boolean};
