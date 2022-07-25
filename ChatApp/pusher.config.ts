import CryptoES from 'crypto-es';
import {User} from './types/user';

export const pusherAPIKey = '53b71d89bd31b54b5359';
export const pusherCluster = 'ap2';
export const pusherSecret = 'bce228c7afbd631697b2';
export const pusherOnAuthorizer =
  (user: User) => (channelName: string, socketId: string) => {
    if (!user) {
      return;
    }

    const userInfo = JSON.stringify({
      user_id: user.id,
      user_info: {name: user.name},
    });
    const stringToSign = socketId + ':' + channelName + ':' + userInfo;
    const signature = CryptoES.HmacSHA256(stringToSign, pusherSecret);
    return {
      auth: pusherAPIKey + ':' + signature,
      channel_data: userInfo,
      shared_secret: 'secret',
    };
  };
