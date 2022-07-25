import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Card, Modal, Paragraph} from 'react-native-paper';
import {useMarks} from './MarksContext';

interface Props {
  visible: boolean;
  onDismiss: () => void;
}

const Grade = ({visible, onDismiss}: Props) => {
  const {getGrade} = useMarks();
  const gradeMetrics = React.useMemo(() => getGrade(), [getGrade]);
  return (
    <Modal visible={visible} onDismiss={onDismiss} style={styles.modal}>
      <Card>
        <Card.Title
          title={'Final grade'}
          subtitle={'Grade is calculated by for 100 marks by average.'}
        />
        <Card.Content>
          {gradeMetrics === null ? (
            <Paragraph>Add marks to calculate your grade.</Paragraph>
          ) : (
            <>
              <Paragraph>{`Your average score is ${gradeMetrics.percentage} out of 100.`}</Paragraph>
              <Paragraph>{`Your grade is '${gradeMetrics.grade}'.`}</Paragraph>
            </>
          )}
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <Button mode="text" style={styles.button} onPress={onDismiss}>
            Close
          </Button>
        </Card.Actions>
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {marginHorizontal: 24},
  cardActions: {justifyContent: 'flex-end'},
  button: {
    marginHorizontal: 8,
    marginVertical: 8,
    paddingHorizontal: 8,
  },
});

export default Grade;
