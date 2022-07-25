import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Appbar,
  Button,
  Menu,
  Headline,
  Provider as PaperProvider,
  Subheading,
  Surface,
  Text,
  TextInput,
  DefaultTheme,
} from 'react-native-paper';
import AreaProvider, {useArea} from './context/AreaProvider';
import {Area, Triangle} from './types/area';
import {Response} from './types/response';

const AppComponent = () => {
  const {areaType, computeArea, handleFieldChange} = useArea();
  const [response, setResponse] = React.useState<Response | null>(null);
  const [visible, setVisible] = React.useState(false);

  const onChangeText = React.useCallback(
    (index: number, value: string) => {
      if (isNaN(Number(value))) {
        return;
      }

      handleFieldChange(index, Number(value));
    },
    [handleFieldChange],
  );

  const onComputeArea = React.useCallback(() => {
    setResponse(computeArea());
  }, [computeArea]);

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Area Calculator" />
        <AreaTypeMenu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={
            <Appbar.Action
              icon="menu"
              color="white"
              onPress={() => setVisible(true)}
            />
          }
        />
      </Appbar.Header>
      <Surface style={styles.container}>
        <Headline style={styles.header}>
          Calculating area for{' '}
          {'subType' in areaType
            ? `${areaType.subType} ${areaType.type}`
            : areaType.type}
        </Headline>
        <Subheading style={styles.subHeader}>
          Choose a different shape by clicking on the menu icon on top.
        </Subheading>
        <View style={styles.fields}>
          {areaType.fields.map((value, index) => (
            <TextInput
              style={styles.field}
              key={`${areaType.fieldNames[index]}-input`}
              value={value === 0 ? '' : value.toString()}
              mode="outlined"
              label={areaType.fieldNames[index]}
              placeholder="Enter value in standard units"
              onChangeText={(text: string) => onChangeText(index, text)}
              keyboardType="number-pad"
            />
          ))}
          <Button style={styles.field} mode="contained" onPress={onComputeArea}>
            Calculate area
          </Button>
          {response && <ResponseBox response={response} />}
        </View>
      </Surface>
    </>
  );
};

type ResponseBoxProps = {response: Response};
const ResponseBox = React.memo(({response}: ResponseBoxProps) => (
  <Surface
    style={[
      styles.response,
      response.type === 'success'
        ? styles.responseSuccess
        : styles.responseError,
    ]}>
    <Text {...(response.type === 'error' && {style: {color: 'white'}})}>
      {response.message}
    </Text>
  </Surface>
));

type AreaTypeMenuProps = {
  visible: boolean;
  onDismiss: () => void;
  anchor: React.ReactNode;
};
const AreaTypeMenu = ({visible, onDismiss, anchor}: AreaTypeMenuProps) => {
  const {handleAreaTypeChange} = useArea();

  return (
    <Menu visible={visible} onDismiss={onDismiss} anchor={anchor}>
      <Menu.Item
        title="Circle"
        onPress={() => handleAreaTypeChange(Area.CIRCLE)}
      />
      <Menu.Item
        title="Rectangle"
        onPress={() => handleAreaTypeChange(Area.RECTANGLE)}
      />
      <Menu.Item
        title="Square"
        onPress={() => handleAreaTypeChange(Area.SQUARE)}
      />
      <Menu.Item
        title="Equilateral Triangle"
        onPress={() =>
          handleAreaTypeChange(Area.TRIANGLE, Triangle.EQUILATERAL)
        }
      />
      <Menu.Item
        title="Isoceles Triangle"
        onPress={() => handleAreaTypeChange(Area.TRIANGLE, Triangle.ISOCELES)}
      />
      <Menu.Item
        title="Scalene Triangle"
        onPress={() => handleAreaTypeChange(Area.TRIANGLE, Triangle.SCALENE)}
      />
    </Menu>
  );
};

const App = () => {
  return (
    <PaperProvider>
      <AreaProvider>
        <AppComponent />
      </AreaProvider>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  header: {
    fontWeight: 'bold',
  },
  subHeader: {
    color: '#565656',
    fontSize: 14,
    lineHeight: 20,
  },
  fields: {
    padding: 8,
  },
  field: {
    marginVertical: 8,
  },
  response: {
    alignItems: 'center',
    padding: 12,
    marginTop: 16,
    borderRadius: 8,
  },
  responseError: {
    backgroundColor: DefaultTheme.colors.error,
  },
  responseSuccess: {
    backgroundColor: DefaultTheme.colors.accent,
  },
});

export default App;
