import React from 'react';
import {StyleSheet} from 'react-native';
import {Appbar, Button, Card, Provider} from 'react-native-paper';
import AddMark from './components/AddMark';
import DeleteMark from './components/DeleteMark';
import EditMark from './components/EditMark';
import Grade from './components/Grade';
import MarksContext from './components/MarksContext';
import MarksTable from './components/MarksTable';

const App = () => {
  const [addMarkVisible, setAddMarkVisible] = React.useState(false);
  const [editMarkVisible, setEditMarkVisible] = React.useState(false);
  const [deleteMarkVisible, setDeleteMarkVisible] = React.useState(false);
  const [gradeVisible, setGradeVisible] = React.useState(false);
  const [selectedMark, setSelectedMark] = React.useState<string>('');

  return (
    <MarksContext>
      <Provider>
        <Appbar.Header>
          <Appbar.Content title="Grades Tracker" />
        </Appbar.Header>
        <Card style={styles.card}>
          <Card.Title
            title="Keep track of your grades easily!"
            subtitle="Add, modify, remove and calculate grades."
          />
          <Card.Content style={styles.cardContent}>
            <MarksTable
              onEditPressed={(id: string) => {
                setSelectedMark(id);
                setEditMarkVisible(true);
              }}
              onDeletePressed={(id: string) => {
                setSelectedMark(id);
                setDeleteMarkVisible(true);
              }}
            />
          </Card.Content>
          <Card.Actions style={styles.cardActions}>
            <Button
              mode="outlined"
              style={styles.button}
              onPress={() => setAddMarkVisible(true)}>
              Add mark
            </Button>
            <Button
              mode="contained"
              style={styles.button}
              onPress={() => setGradeVisible(true)}>
              Calculate
            </Button>
          </Card.Actions>
        </Card>
        {addMarkVisible && (
          <AddMark
            visible={addMarkVisible}
            onDismiss={() => setAddMarkVisible(false)}
          />
        )}
        {editMarkVisible && (
          <EditMark
            id={selectedMark}
            visible={editMarkVisible}
            onDismiss={() => setEditMarkVisible(false)}
          />
        )}
        {deleteMarkVisible && (
          <DeleteMark
            id={selectedMark}
            visible={deleteMarkVisible}
            onDismiss={() => setDeleteMarkVisible(false)}
          />
        )}
        {gradeVisible && (
          <Grade
            visible={gradeVisible}
            onDismiss={() => setGradeVisible(false)}
          />
        )}
      </Provider>
    </MarksContext>
  );
};

const styles = StyleSheet.create({
  card: {flex: 1},
  cardActions: {justifyContent: 'flex-end'},
  cardContent: {flex: 1},
  input: {
    marginTop: 8,
  },
  button: {
    marginHorizontal: 8,
    marginVertical: 8,
    paddingHorizontal: 8,
  },
  result: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lime',
    padding: 4,
  },
});

export default App;
