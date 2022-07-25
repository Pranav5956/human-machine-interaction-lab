export enum Area {
  CIRCLE = 'Circle',
  TRIANGLE = 'Triangle',
  RECTANGLE = 'Rectangle',
  SQUARE = 'Square',
}

export enum Triangle {
  EQUILATERAL = 'Equilateral',
  ISOCELES = 'Isoceles',
  SCALENE = 'Scalene',
}

export type CircleAreaType = {
  type: Area.CIRCLE;
  fields: number[];
  fieldNames: string[];
};
export type RectangleAreaType = {
  type: Area.RECTANGLE;
  fields: number[];
  fieldNames: string[];
};
export type SquareAreaType = {
  type: Area.SQUARE;
  fields: number[];
  fieldNames: string[];
};
export type EquilateralTriangleAreaType = {
  type: Area.TRIANGLE;
  subType: Triangle.EQUILATERAL;
  fields: number[];
  fieldNames: string[];
};
export type IsocelesTriangleAreaType = {
  type: Area.TRIANGLE;
  subType: Triangle.ISOCELES;
  fields: number[];
  fieldNames: string[];
};
export type ScaleneTriangleAreaType = {
  type: Area.TRIANGLE;
  subType: Triangle.SCALENE;
  fields: number[];
  fieldNames: string[];
};
export type AreaType =
  | CircleAreaType
  | RectangleAreaType
  | SquareAreaType
  | EquilateralTriangleAreaType
  | IsocelesTriangleAreaType
  | ScaleneTriangleAreaType;

export const isCircleAreaType = (
  areaType: AreaType,
): areaType is CircleAreaType => {
  return areaType.type === Area.CIRCLE;
};
export const isRectangleAreaType = (
  areaType: AreaType,
): areaType is RectangleAreaType => {
  return areaType.type === Area.RECTANGLE;
};
export const isSquareAreaType = (
  areaType: AreaType,
): areaType is SquareAreaType => {
  return areaType.type === Area.SQUARE;
};
export const isEquilateralTriangleAreaType = (
  areaType: AreaType,
): areaType is EquilateralTriangleAreaType => {
  return (
    areaType.type === Area.TRIANGLE && areaType.subType === Triangle.EQUILATERAL
  );
};
export const isIsocelesTriangleAreaType = (
  areaType: AreaType,
): areaType is IsocelesTriangleAreaType => {
  return (
    areaType.type === Area.TRIANGLE && areaType.subType === Triangle.ISOCELES
  );
};
export const isScaleneTriangleAreaType = (
  areaType: AreaType,
): areaType is ScaleneTriangleAreaType => {
  return (
    areaType.type === Area.TRIANGLE && areaType.subType === Triangle.SCALENE
  );
};

export const getInitialAreaType = (
  type: Area,
  subType: Triangle | undefined = undefined,
): AreaType => {
  if (type === Area.CIRCLE) {
    return {type, fields: [0], fieldNames: ['Radius']} as CircleAreaType;
  }
  if (type === Area.RECTANGLE) {
    return {
      type,
      fields: [0, 0],
      fieldNames: ['Length', 'Breadth'],
    } as RectangleAreaType;
  }
  if (type === Area.SQUARE) {
    return {type, fields: [0], fieldNames: ['Side']} as SquareAreaType;
  }
  if (type === Area.TRIANGLE) {
    if (subType === Triangle.EQUILATERAL) {
      return {
        type,
        subType,
        fields: [0],
        fieldNames: ['Side'],
      } as EquilateralTriangleAreaType;
    }
    if (subType === Triangle.ISOCELES) {
      return {
        type,
        subType,
        fields: [0, 0],
        fieldNames: ['Common side', 'Base'],
      } as IsocelesTriangleAreaType;
    }
    if (subType === Triangle.SCALENE) {
      return {
        type,
        subType,
        fields: [0, 0, 0],
        fieldNames: ['Side 1', 'Side 2', 'Side 3'],
      } as ScaleneTriangleAreaType;
    }
  }

  return {type: Area.CIRCLE, fields: [0]} as CircleAreaType;
};
