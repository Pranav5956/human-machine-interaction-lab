import {User} from './user';

export interface MessageEvent {
  id: string;
  type: 'message';
  sender: User;
  message: string;
  timestamp: number;
}
