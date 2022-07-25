import React from "react";
import { StyleSheet } from "react-native";
import {
  Button,
  Headline,
  HelperText,
  Surface,
  TextInput,
} from "react-native-paper";
import { useAuth } from "../context/Authentication";
import { User } from "../types/user";

type Props = {};

const AuthenticationArea = (props: Props) => {
  const [name, setName] = React.useState("");
  const [errors, setErrors] = React.useState<null | string>(null);

  const { loginUser } = useAuth();

  const onJoin = React.useCallback(() => {
    const trimmedName = name;
    if (trimmedName.length === 0) {
      setErrors("Please provide a name to join a chat!");
      return;
    }

    if (!/^[a-zA-Z0-9\_]*$/.test(trimmedName)) {
      setErrors(
        "Username can only contain alphabets, numbers and underscores (_)!"
      );
      return;
    }

    loginUser(trimmedName);
  }, [name]);

  return (
    <Surface style={styles.authenticationArea}>
      <Headline>LOGIN</Headline>
      <TextInput
        style={styles.authenticationInput}
        value={name}
        onChangeText={setName}
        label="Username"
        placeholder="Enter a username"
        mode="outlined"
      />
      <HelperText
        style={styles.authenticationErrors}
        type="error"
        visible={!!errors}>
        {errors}
      </HelperText>
      <Button mode="outlined" onPress={onJoin}>
        Join chat!
      </Button>
    </Surface>
  );
};

const styles = StyleSheet.create({
  authenticationArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authenticationInput: {
    width: "90%",
    marginVertical: 8,
  },
  authenticationErrors: {
    marginBottom: 16,
    textAlign: "center",
    paddingHorizontal: 40,
  },
});

export default AuthenticationArea;
