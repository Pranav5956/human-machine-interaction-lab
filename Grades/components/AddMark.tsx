import {Formik} from 'formik';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Card, Modal, TextInput} from 'react-native-paper';
import markValidationSchema, {
  markInputType,
} from '../shared/MarkValidationSchema';
import {useMarks} from './MarksContext';

interface Props {
  visible: boolean;
  onDismiss: () => void;
}

const AddMark = ({visible, onDismiss}: Props) => {
  const {addMark} = useMarks();

  const onSubmit = (values: markInputType) => {
    addMark({
      subjectName: values.subjectName,
      mark: parseInt(values.mark, 10),
      totalMark: parseInt(values.totalMark, 10),
    });
    onDismiss();
  };

  return (
    <Modal visible={visible} onDismiss={onDismiss} style={styles.modal}>
      <Card>
        <Formik
          initialValues={
            {subjectName: '', mark: '', totalMark: ''} as markInputType
          }
          validationSchema={markValidationSchema}
          onSubmit={onSubmit}>
          {({values, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
            <>
              <Card.Title
                title={'Add a mark'}
                subtitle={'Fill the fields and click on Add button.'}
              />
              <Card.Content>
                <TextInput
                  mode="outlined"
                  onChangeText={handleChange('subjectName')}
                  onBlur={handleBlur('subjectName')}
                  value={values.subjectName}
                  label="Subject name"
                  placeholder="Enter subject name"
                  style={styles.input}
                />
                <TextInput
                  mode="outlined"
                  onChangeText={handleChange('mark')}
                  onBlur={handleBlur('mark')}
                  value={values.mark}
                  label="Marks"
                  placeholder="Enter marks"
                  keyboardType="numeric"
                  style={styles.input}
                />
                <TextInput
                  mode="outlined"
                  onChangeText={handleChange('totalMark')}
                  onBlur={handleBlur('totalMark')}
                  value={values.totalMark}
                  label="Maximum marks"
                  placeholder="Enter maximum marks"
                  keyboardType="numeric"
                  style={styles.input}
                />
              </Card.Content>
              <Card.Actions style={styles.cardActions}>
                <Button mode="text" style={styles.button} onPress={onDismiss}>
                  Cancel
                </Button>
                <Button
                  mode="contained"
                  style={styles.button}
                  disabled={isSubmitting}
                  onPress={handleSubmit}>
                  Add
                </Button>
              </Card.Actions>
            </>
          )}
        </Formik>
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
  input: {
    marginVertical: 4,
  },
});

export default AddMark;
