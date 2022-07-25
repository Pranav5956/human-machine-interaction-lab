import {User} from './user';

export type MemberEvent =
  | {
      id: string;
      type: 'member';
      status: 'connected';
      member: User;
    }
  | {id: string; type: 'member'; status: 'disconnected'; member: User};
