import React from 'react';
import {StyleSheet, View} from 'react-native';
import {DataTable, Headline, IconButton, Paragraph} from 'react-native-paper';
import {useMarks} from './MarksContext';

interface Props {
  onEditPressed: (id: string) => void;
  onDeletePressed: (id: string) => void;
}

const MarksTable = ({onEditPressed, onDeletePressed}: Props) => {
  const {marks} = useMarks();
  const [page, onPageChange] = React.useState(0);
  const numberOfItemsPerPage = 8;

  const numberOfPages = Math.ceil(marks.length / numberOfItemsPerPage);
  const from = marks.length !== 0 ? page * numberOfItemsPerPage + 1 : 0;
  const to = Math.min((page + 1) * numberOfItemsPerPage, marks.length);

  const data = React.useMemo(
    () =>
      marks.slice(
        page * numberOfItemsPerPage,
        (page + 1) * numberOfItemsPerPage,
      ),
    [marks, page],
  );

  if (marks.length === 0) {
    return (
      <View style={styles.container}>
        <Headline>No marks available!</Headline>
        <Paragraph>Start by clicking on the "ADD MARK" button below!</Paragraph>
      </View>
    );
  }

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title sortDirection="descending">Subject</DataTable.Title>
        <DataTable.Title numeric>Marks</DataTable.Title>
        <DataTable.Title numeric>Total Marks</DataTable.Title>
        <DataTable.Title numeric> </DataTable.Title>
      </DataTable.Header>

      {data.map(d => (
        <DataTable.Row key={d.id}>
          <DataTable.Cell>{d.subjectName}</DataTable.Cell>
          <DataTable.Cell numeric>{d.mark}</DataTable.Cell>
          <DataTable.Cell numeric>{d.totalMark}</DataTable.Cell>
          <DataTable.Cell numeric>
            <IconButton icon="pencil" onPress={() => onEditPressed(d.id)} />
            <IconButton icon="delete" onPress={() => onDeletePressed(d.id)} />
          </DataTable.Cell>
        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={numberOfPages}
        onPageChange={onPageChange}
        label={`Showing ${from}-${to} of ${marks.length} items`}
        showFastPaginationControls
        numberOfItemsPerPage={numberOfItemsPerPage}
      />
    </DataTable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MarksTable;
