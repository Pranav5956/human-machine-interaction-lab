import React from 'react';
import {User} from '../types/user';
import uuid from 'react-native-uuid';

type UserType = User | null;
type AuthenticationType = {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
};
const AuthenticationContext = React.createContext<AuthenticationType>({
  user: null,
  setUser: () => {},
});

type Props = {children: React.ReactElement};

const AuthenticationProvider = ({children}: Props) => {
  const [user, setUser] = React.useState<UserType>(null);

  return (
    <AuthenticationContext.Provider value={{user, setUser}}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;

export const useAuth = () => {
  const {user, setUser} = React.useContext(AuthenticationContext);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    setIsAuthenticated(user !== null);
  }, [user, setIsAuthenticated]);

  const loginUser = React.useCallback(
    (name: string) => {
      if (user !== null) {
        throw new Error('User already logged in.');
      }

      setUser({id: uuid.v4() as string, name});
    },
    [user, setUser],
  );

  const logoutUser = React.useCallback(() => {
    if (user === null) {
      throw new Error('No user exists.');
    }
    setUser(null);
  }, [user, setUser]);

  return {user, isAuthenticated, loginUser, logoutUser};
};
