import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {
  Appbar,
  Button,
  Card,
  Paragraph,
  Provider,
  Snackbar,
  TextInput,
  Title,
} from 'react-native-paper';

type Operation = 'add' | 'multiply';

const App = () => {
  const [number1, setNumber1] = React.useState('');
  const [number2, setNumber2] = React.useState('');
  const [result, setResult] = React.useState<string | null>(null);
  const [snackBarOpen, setSnackBarOpen] = React.useState(false);

  const compute = React.useCallback(
    (operation: Operation) => {
      if (isNaN(Number(number1)) || isNaN(Number(number2))) {
        return null;
      }

      const _number1 = parseInt(number1, 10);
      const _number2 = parseInt(number2, 10);

      return operation === 'add' ? _number1 + _number2 : _number1 * _number2;
    },
    [number1, number2],
  );

  const handleChangeNumber1 = (text: string) => {
    if (isNaN(Number(text))) {
      return;
    }

    setNumber1(text);
  };

  const handleChangeNumber2 = (text: string) => {
    if (isNaN(Number(text))) {
      return;
    }

    setNumber2(text);
  };

  const onCompute = (operation: Operation) => {
    const _result = compute(operation);

    if (isNaN(_result!)) {
      return;
    }

    setResult(
      `${
        operation === 'add' ? 'Addition' : 'Multiplication'
      } of ${number1} and ${number2} is ${_result}!`,
    );
    setSnackBarOpen(true);
  };

  const onDismissSnackBar = () => {
    setSnackBarOpen(false);
  };

  return (
    <Provider>
      <Appbar.Header>
        <Appbar.Content title="Simple Mathematics Application" />
      </Appbar.Header>
      <Card>
        <Card.Content>
          <Title>Add &amp; Multiply 2 Numbers</Title>
          <Paragraph>
            Enter 2 numbers and click on the &quot;Add&quot; or
            &quot;Multiply&quot; button.
          </Paragraph>
          <TextInput
            label="First Number"
            keyboardType="numeric"
            value={number1}
            onChangeText={handleChangeNumber1}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Second Number"
            keyboardType="numeric"
            value={number2}
            onChangeText={handleChangeNumber2}
            style={styles.input}
            mode="outlined"
          />
          <SafeAreaView style={styles.buttonContainer}>
            <Button
              mode="contained"
              style={styles.button}
              onPress={() => onCompute('add')}>
              Addition
            </Button>
            <Button
              mode="contained"
              style={styles.button}
              onPress={() => onCompute('multiply')}>
              Multiplication
            </Button>
          </SafeAreaView>
        </Card.Content>
      </Card>

      <Snackbar
        visible={snackBarOpen}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Dismiss',
          onPress: onDismissSnackBar,
        }}>
        {result}
      </Snackbar>
    </Provider>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 8,
  },
  buttonContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  result: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lime',
    padding: 4,
  },
});

export default App;
