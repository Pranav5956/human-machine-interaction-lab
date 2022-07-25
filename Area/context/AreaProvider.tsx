import React from 'react';
import {Area, AreaType, getInitialAreaType, Triangle} from '../types/area';
import {calculateArea} from '../utils/area';

type AreaContextType = {
  areaType: AreaType;
  setAreaType: React.Dispatch<React.SetStateAction<AreaType>>;
};
const initialState = getInitialAreaType(Area.CIRCLE);
const AreaContext = React.createContext<AreaContextType>({
  areaType: initialState as AreaType,
  setAreaType: () => {},
});

type Props = {children: React.ReactNode};
const AreaProvider = ({children}: Props) => {
  const [areaType, setAreaType] = React.useState<AreaType>(initialState);
  const value = React.useMemo(() => ({areaType, setAreaType}), [areaType]);

  return <AreaContext.Provider value={value}>{children}</AreaContext.Provider>;
};

export default AreaProvider;

export const useArea = () => {
  const {areaType, setAreaType} = React.useContext(AreaContext);

  const handleFieldChange = React.useCallback(
    (fieldIndex: number, fieldValue: number) => {
      setAreaType(_areaType => ({
        ..._areaType,
        fields: _areaType.fields.map((value, index) =>
          index === fieldIndex ? fieldValue : value,
        ),
      }));
    },
    [setAreaType],
  );

  const computeArea = React.useCallback(() => {
    return calculateArea(areaType);
  }, [areaType]);

  const handleAreaTypeChange = React.useCallback(
    (type: Area, subType: Triangle | undefined = undefined) => {
      setAreaType(getInitialAreaType(type, subType));
    },
    [setAreaType],
  );

  return {areaType, handleAreaTypeChange, handleFieldChange, computeArea};
};
