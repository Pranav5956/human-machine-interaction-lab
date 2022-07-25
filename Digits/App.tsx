import React from 'react';
import {
  Appbar,
  Button,
  Provider,
  Snackbar,
  Surface,
  TextInput,
} from 'react-native-paper';

const App = () => {
  const [number, setNumber] = React.useState('');
  const [result, setResult] = React.useState<null | number>(null);

  const countDigits = React.useCallback(() => {
    if (number === '') {
      setResult(null);
      return;
    }

    setResult(Math.floor(Math.log10(parseInt(number, 10))) + 1);
  }, [number]);

  return (
    <Provider>
      <Appbar.Header>
        <Appbar.Content title="Number of Digits" />
      </Appbar.Header>
      <Surface style={{flex: 1}}>
        <TextInput
          style={{margin: 8}}
          mode="outlined"
          keyboardType="numeric"
          onChangeText={setNumber}
          value={number}
          label="Choose number"
          placeholder="Enter a number"
        />
        <Button mode="contained" style={{margin: 8}} onPress={countDigits}>
          Calculate number of digits
        </Button>
      </Surface>
      {!!result && (
        <Snackbar visible={true} onDismiss={() => setResult(null)}>
          Number of digits is {result}!
        </Snackbar>
      )}
    </Provider>
  );
};

export default App;
