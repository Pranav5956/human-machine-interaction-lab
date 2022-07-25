import {PusherEvent} from '@pusher/pusher-websocket-react-native';
import React from 'react';
import {TypingEvent, TypingType} from '../types/typing';

type TypingContextType = {
  typing: TypingType[];
  setTyping: React.Dispatch<React.SetStateAction<TypingType[]>>;
};

const TypingContext = React.createContext<TypingContextType>({
  typing: [],
  setTyping: () => {},
});

type Props = {children: React.ReactNode};
const TypingProvider = ({children}: Props) => {
  const [typing, setTyping] = React.useState<TypingType[]>([]);
  const value = React.useMemo(() => ({typing, setTyping}), [typing]);

  return (
    <TypingContext.Provider value={value}>{children}</TypingContext.Provider>
  );
};

export default TypingProvider;

export const useTyping = () => {
  const {typing, setTyping} = React.useContext(TypingContext);

  const handleTypingFromChannel = React.useCallback(
    (event: PusherEvent) => {
      const data: TypingEvent = JSON.parse(event.data);

      if (data.isTyping) {
        setTyping(_typing => [data.member, ..._typing]);
      } else {
        setTyping(_typing =>
          _typing.filter(member => member.id !== data.member.id),
        );
      }
    },
    [setTyping],
  );

  const removeTypingOnMemberRemoved = React.useCallback(
    (memberId: string) => {
      setTyping(_typing => _typing.filter(member => member.id !== memberId));
    },
    [setTyping],
  );

  const typingText = React.useCallback(() => {
    if (typing.length === 0) {
      return '';
    }

    if (typing.length === 1) {
      return `${typing[0].name} is typing...`;
    }

    if (typing.length === 2) {
      return `${typing[0].name} and ${typing[1].name} are typing...`;
    }

    return `${typing[0].name} and ${typing.length - 1} others are typing...`;
  }, [typing]);

  return {
    typing,
    handleTypingFromChannel,
    removeTypingOnMemberRemoved,
    typingText,
  };
};
