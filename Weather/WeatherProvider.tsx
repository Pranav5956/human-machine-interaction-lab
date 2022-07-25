import Geolocation from '@react-native-community/geolocation';
import React from 'react';
import {PermissionsAndroid} from 'react-native';

export type Location = {latitude: string; longitude: string};
export type WeatherData = {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    [key: string]: any;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_mph: number;
    wind_kph: number;
    wind_dir: string;
    precip_mm: number;
    humidity: number;
    cloud: number;
    uv: number;
  };
};

type LocationContextType = {
  loading: boolean;
  location: Location | null;
  status: string | null;
};
const LocationContext = React.createContext<LocationContextType>({
  loading: true,
  location: null,
  status: null,
});

type Props = {children: React.ReactNode};
const LocationProvider = ({children}: Props) => {
  const [location, setLocation] = React.useState<LocationContextType>({
    loading: true,
    location: null,
    status: null,
  });

  React.useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getOneTimeLocation();
        } else {
          setLocation(_location => ({
            ..._location,
            status: 'Permission Denied',
          }));
        }
      } catch (err) {
        console.warn(err);
      }
    };
    requestLocationPermission();

    return () => {
      Geolocation.stopObserving();
    };
  }, []);

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const longitude = JSON.stringify(position.coords.longitude);
        const latitude = JSON.stringify(position.coords.latitude);

        setLocation({
          loading: false,
          location: {
            longitude,
            latitude,
          },
          status: null,
        });
      },
      error => {
        setLocation({
          loading: false,
          location: null,
          status: error.message,
        });
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  return (
    <LocationContext.Provider value={location}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;

export const useLocation = () => {
  const location = React.useContext(LocationContext);

  return location;
};
