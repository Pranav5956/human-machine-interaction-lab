import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {
  ActivityIndicator,
  Headline,
  Provider as PaperProvider,
  Subheading,
  Surface,
  Text,
} from 'react-native-paper';
import LocationProvider, {useLocation, WeatherData} from './WeatherProvider';
import axios from 'axios';

const App = () => {
  return (
    <PaperProvider>
      <LocationProvider>
        <WeatherDetails />
      </LocationProvider>
    </PaperProvider>
  );
};

const WeatherDetails = () => {
  const {loading, location, status} = useLocation();
  const [weatherData, setWeatherData] = React.useState<{
    loading: boolean;
    data: WeatherData | null;
  }>({loading: true, data: null});

  React.useEffect(() => {
    if (location === null) {
      return;
    }

    (async () => {
      setWeatherData({loading: true, data: null});
      const q = `${Number(location.latitude).toFixed(4)},${Number(
        location.longitude,
      ).toFixed(4)}`;
      const {data} = await axios.get<WeatherData>(
        'http://api.weatherapi.com/v1/current.json',
        {
          params: {
            key: '16f4dacc0c3b4c03b5294119222507',
            q,
            aqi: 'no',
          },
        },
      );
      console.log(data);
      setWeatherData({loading: false, data});
    })();
  }, [location]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (status) {
    return (
      <View
        style={styles.container}
        accessible
        accessibilityLabel="Error"
        accessibilityHint="Error loading weather data."
        accessibilityLiveRegion="assertive">
        <Headline>{status}</Headline>
      </View>
    );
  }

  if (weatherData.loading || weatherData.data === null) {
    return (
      <View
        style={styles.container}
        accessible
        accessibilityLabel="Loading"
        accessibilityHint="Loading weather data from API..."
        accessibilityLiveRegion="polite">
        <ActivityIndicator size="large" />
        <Headline>Retrieving weather information...</Headline>
      </View>
    );
  }

  return (
    <View
      style={styles.container}
      accessible
      accessibilityLabel="Weather data"
      accessibilityHint="Displays the current weather data in your location."
      accessibilityLiveRegion="assertive">
      <Headline>Weather Data</Headline>
      <Image
        source={[{uri: 'https:' + weatherData.data.current.condition.icon}]}
        style={{width: 150, height: 150}}
      />
      <Subheading>{weatherData.data.current.condition.text}</Subheading>
      <Surface style={styles.infoContainer}>
        <InfoElement
          title="Cloud cover"
          content={weatherData.data.current.cloud.toString()}
        />
        <InfoElement
          title="Wind Speed"
          content={`${weatherData.data.current.wind_kph} kph / ${weatherData.data.current.wind_mph} mph`}
        />
        <InfoElement
          title="Temperature"
          content={`${weatherData.data.current.temp_c}°C / ${weatherData.data.current.temp_f} F`}
        />
        <InfoElement
          title="Precipitation"
          content={`${weatherData.data.current.precip_mm} mm`}
        />
        <InfoElement
          title="Humidity"
          content={`${weatherData.data.current.humidity}%`}
        />
      </Surface>
    </View>
  );
};

type InfoProps = {title: string; content: string};
const InfoElement = ({title, content}: InfoProps) => {
  return (
    <View style={styles.infoElement}>
      <Text style={styles.infoText}>{title}</Text>
      <Text style={styles.infoText}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  infoContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    margin: 16,
    borderRadius: 10,
  },
  infoElement: {
    fontSize: 16,
    width: '100%',
    textAlign: 'center',
    flexDirection: 'row',
    padding: 16,
  },
  infoText: {
    textAlign: 'center',
    flex: 1,
  },
});

export default App;
