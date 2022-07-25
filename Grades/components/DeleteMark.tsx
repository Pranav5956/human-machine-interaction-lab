import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Card, Modal, Paragraph} from 'react-native-paper';
import {useMarks} from './MarksContext';

interface Props {
  id: string;
  visible: boolean;
  onDismiss: () => void;
}

const DeleteMark = ({id, visible, onDismiss}: Props) => {
  const {removeMark} = useMarks();

  const onDelete = () => {
    removeMark(id);
    onDismiss();
  };

  return (
    <Modal visible={visible} onDismiss={onDismiss} style={styles.modal}>
      <Card>
        <Card.Title
          title={'Delete mark'}
          subtitle={'Deletes a mark permanently.'}
        />
        <Card.Content>
          <Paragraph>Are you sure you want to delete this mark?</Paragraph>
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <Button mode="text" style={styles.button} onPress={onDismiss}>
            Cancel
          </Button>
          <Button mode="contained" style={styles.button} onPress={onDelete}>
            Delete
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

export default DeleteMark;
