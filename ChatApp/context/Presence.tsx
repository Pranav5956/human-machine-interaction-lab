import React from 'react';
import {PresenceType} from '../types/presence';

type PresenceContextType = {
  presence: PresenceType;
  setPresence: React.Dispatch<React.SetStateAction<PresenceType>>;
};

const PresenceContext = React.createContext<PresenceContextType>({
  presence: 0,
  setPresence: () => {},
});

type Props = {children: React.ReactNode};
const PresenceProvider = ({children}: Props) => {
  const [presence, setPresence] = React.useState<PresenceType>(0);
  const value = React.useMemo(() => ({presence, setPresence}), [presence]);

  return (
    <PresenceContext.Provider value={value}>
      {children}
    </PresenceContext.Provider>
  );
};

export default PresenceProvider;

export const usePresence = () => {
  const {presence, setPresence} = React.useContext(PresenceContext);

  const addPresence = React.useCallback(() => {
    setPresence(_presence => _presence + 1);
  }, [setPresence]);

  const removePresence = React.useCallback(() => {
    setPresence(_presence => _presence - 1);
  }, [setPresence]);

  const initializePresence = React.useCallback(
    (_presence: number) => {
      setPresence(_presence);
    },
    [setPresence],
  );

  return {
    presence,
    addPresence,
    removePresence,
    initializePresence,
  };
};
