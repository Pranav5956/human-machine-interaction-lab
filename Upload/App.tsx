import React from 'react';
import {ImageURISource, StyleSheet} from 'react-native';
import {Provider, Appbar, Card, Avatar, Button} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';

const blankProfileUri =
  'https://lawsontravel.com/wp-content/uploads/2017/07/blank-profile-picture-973460_640.png';

const App = () => {
  const [imageSource, setImageSource] = React.useState<ImageURISource>({
    uri: blankProfileUri,
  });

  const onUploadPressed = async () => {
    try {
      const {uri} = await DocumentPicker.pickSingle({
        type: DocumentPicker.types.images,
      });
      setImageSource({uri});
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Provider>
      <Appbar.Header>
        <Appbar.Content title="File Uploader" />
      </Appbar.Header>
      <Card style={styles.card}>
        <Card.Title title="Update Profile Image" />
        <Card.Content style={styles.cardContent}>
          <Avatar.Image size={250} source={imageSource} />
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <Button mode="contained" onPress={onUploadPressed}>
            Upload image
          </Button>
        </Card.Actions>
      </Card>
    </Provider>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 16,
    borderRadius: 8,
  },
  cardContent: {
    alignItems: 'center',
    margin: 16,
    flex: 1,
    justifyContent: 'space-around',
  },
  cardActions: {
    margin: 8,
    justifyContent: 'flex-end',
  },
});

export default App;
