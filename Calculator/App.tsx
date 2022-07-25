import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Appbar,
  Button,
  Headline,
  Provider,
  Surface,
  Text,
} from 'react-native-paper';

const App = () => {
  const [input, setInput] = React.useState('');

  const onNumberPressed = (number: string) => {
    setInput(i => i + number);
    console.log(number);
  };

  const onOperatorPressed = (operator: string) => {
    if (
      ['+', '-', '*', '/'].some(op => {
        return input.includes(op);
      })
    ) {
      onCompute();
    }

    setInput(i => i + operator);
  };

  const onCompute = () => {
    // eslint-disable-next-line no-eval
    setInput(i => eval(i).toString());
  };

  const onClear = () => {
    setInput('');
  };

  return (
    <Provider>
      <Appbar.Header>
        <Appbar.Content title="Calculator" />
      </Appbar.Header>
      <Surface style={styles.calculator}>
        <Surface style={styles.expression}>
          <Text style={{textAlign: 'right', color: 'white', fontSize: 48}}>
            {input}
          </Text>
        </Surface>
        <Surface style={styles.buttons}>
          <Surface style={styles.numbers}>
            <Button
              mode="outlined"
              style={styles.button}
              onPress={() => onNumberPressed('7')}>
              <Headline>7</Headline>
            </Button>
            <Button
              mode="outlined"
              style={styles.button}
              onPress={() => onNumberPressed('8')}>
              <Headline>8</Headline>
            </Button>
            <Button
              mode="outlined"
              style={styles.button}
              onPress={() => onNumberPressed('9')}>
              <Headline>9</Headline>
            </Button>
            <Button
              mode="outlined"
              style={styles.button}
              onPress={() => onNumberPressed('4')}>
              <Headline>4</Headline>
            </Button>
            <Button
              mode="outlined"
              style={styles.button}
              onPress={() => onNumberPressed('5')}>
              <Headline>5</Headline>
            </Button>
            <Button
              mode="outlined"
              style={styles.button}
              onPress={() => onNumberPressed('6')}>
              <Headline>6</Headline>
            </Button>
            <Button
              mode="outlined"
              style={styles.button}
              onPress={() => onNumberPressed('1')}>
              <Headline>1</Headline>
            </Button>
            <Button
              mode="outlined"
              style={styles.button}
              onPress={() => onNumberPressed('2')}>
              <Headline>2</Headline>
            </Button>
            <Button
              mode="outlined"
              style={styles.button}
              onPress={() => onNumberPressed('3')}>
              <Headline>3</Headline>
            </Button>
            <Button mode="outlined" style={styles.button} onPress={onClear}>
              <Headline>C</Headline>
            </Button>
            <Button
              mode="outlined"
              style={styles.button}
              onPress={() => onNumberPressed('0')}>
              <Headline>0</Headline>
            </Button>
            <Button mode="outlined" style={styles.button} onPress={onCompute}>
              <Headline>=</Headline>
            </Button>
          </Surface>
          <Surface style={styles.utils}>
            <Button
              mode="outlined"
              style={styles.button}
              onPress={() => onOperatorPressed('/')}>
              <Headline>/</Headline>
            </Button>
            <Button
              mode="outlined"
              style={styles.button}
              onPress={() => onOperatorPressed('*')}>
              <Headline>*</Headline>
            </Button>
            <Button
              mode="outlined"
              style={styles.button}
              onPress={() => onOperatorPressed('-')}>
              <Headline>-</Headline>
            </Button>
            <Button
              mode="outlined"
              style={styles.button}
              onPress={() => onOperatorPressed('+')}>
              <Headline>+</Headline>
            </Button>
          </Surface>
        </Surface>
      </Surface>
    </Provider>
  );
};

const styles = StyleSheet.create({
  calculator: {
    flex: 1,
    flexDirection: 'column',
  },
  expression: {
    flex: 0.1,
    padding: 16,
    margin: 16,
    backgroundColor: '#5a5a5a',
  },
  buttons: {
    flex: 0.8,
    flexDirection: 'row',
  },
  numbers: {
    flexDirection: 'row',
    flex: 0.75,
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  utils: {
    flexDirection: 'column',
    flex: 0.25,
  },
  button: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },
  emphasizedButton: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    color: 'white',
  },
});

export default App;
