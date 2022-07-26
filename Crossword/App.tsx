import React from 'react';
import {Appbar, Provider} from 'react-native-paper';
import CrosswordComponent from './CrosswordComponent';

const App = () => {
  return (
    <Provider>
      <Appbar.Header>
        <Appbar.Content title="Crossword Puzzle" />
      </Appbar.Header>
      <CrosswordComponent />
    </Provider>
  );
};

export default App;
