import React from 'react';
import {Dimensions, KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import {Subheading, Surface, Text} from 'react-native-paper';
import {crossword, crosswordClues} from './crossword';

const CrosswordComponent = () => {
  const [currentAnswer, setCurrentAnswer] = React.useState('');
  const [currentCrossword, setCurrentCrossword] = React.useState<string[][]>(
    new Array(5).fill('').map(() => new Array(5).fill('')),
  );

  return (
    <Surface style={styles.crossword}>
      <KeyboardAvoidingView
        accessible
        accessibilityLabel="crossword"
        accessibilityHint="The crossword puzzle area"
        style={styles.crosswordBoard}>
        {currentCrossword.map((currentCrosswordRow, row) => (
          <View style={styles.crosswordBoardRow} key={`crossword-row-${row}`}>
            {currentCrosswordRow.map((value, index) => (
              <View
                style={[
                  styles.crosswordBoardCell,
                  crossword[row][index] === null &&
                    styles.crosswordBoardCellBlock,
                ]}
                key={`crossword-cell-${index}`}>
                <Text style={styles.crosswordBoardCellText}>
                  {crossword[row][index]?.letter || ''}
                </Text>
                {crossword[row][index]?.marker && (
                  <Text style={styles.crosswordBoardCellMarker}>
                    {crossword[row][index]!.marker}
                  </Text>
                )}
              </View>
            ))}
          </View>
        ))}
      </KeyboardAvoidingView>
      <KeyboardAvoidingView style={styles.crosswordClueBox}>
        <View style={styles.crosswordClueSection}>
          <Subheading style={styles.crosswordClueHeader}>Across</Subheading>
          <View style={styles.crosswordClues}>
            {crosswordClues.across.map(clue => (
              <Text
                key={`across-clue-${clue.id}`}>{`${clue.id}. ${clue.clue}`}</Text>
            ))}
          </View>
        </View>
        <View style={styles.crosswordClueSection}>
          <Subheading style={styles.crosswordClueHeader}>Down</Subheading>
          {crosswordClues.down.map(clue => (
            <Text
              key={`down-clue-${clue.id}`}>{`${clue.id}. ${clue.clue}`}</Text>
          ))}
        </View>
      </KeyboardAvoidingView>
    </Surface>
  );
};

const margin = 30;
const width = 410 - margin * 2;
const styles = StyleSheet.create({
  crossword: {
    flexDirection: 'column',
  },
  crosswordBoard: {
    flexDirection: 'column',
    margin,
  },
  crosswordBoardRow: {
    flexDirection: 'row',
  },
  crosswordBoardCell: {
    width: width / 5,
    height: width / 5,
    borderWidth: 1,
    borderColor: '#000',
    position: 'relative',
  },
  crosswordBoardCellBlock: {
    backgroundColor: '#000',
  },
  crosswordBoardCellText: {
    fontSize: width / 10,
    alignSelf: 'center',
    marginTop: 8,
  },
  crosswordBoardCellMarker: {
    position: 'absolute',
    top: 2,
    left: 5,
  },
  crosswordBoardCellTextDown: {
    position: 'absolute',
    top: 2,
    right: 5,
  },
  crosswordClueBox: {
    paddingLeft: 30,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
    marginHorizontal: margin,
    padding: margin / 3,
  },
  crosswordClueSection: {},
  crosswordClueHeader: {
    fontWeight: 'bold',
  },
  crosswordClues: {},
});

export default CrosswordComponent;
