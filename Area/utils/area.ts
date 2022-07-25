import {
  AreaType,
  CircleAreaType,
  EquilateralTriangleAreaType,
  isCircleAreaType,
  isEquilateralTriangleAreaType,
  isIsocelesTriangleAreaType,
  IsocelesTriangleAreaType,
  isRectangleAreaType,
  isScaleneTriangleAreaType,
  isSquareAreaType,
  RectangleAreaType,
  ScaleneTriangleAreaType,
  SquareAreaType,
} from '../types/area';
import {createResponse, Response} from '../types/response';

const calculateCircleArea = (areaType: CircleAreaType): Response => {
  if (areaType.fields[0] === 0) {
    return createResponse('error', 'Radius cannot be 0!');
  }

  return createResponse(
    'success',
    `Area of the circle is ${(
      Math.PI *
      areaType.fields[0] *
      areaType.fields[0]
    ).toFixed(2)} squared units!`,
  );
};

const calculateRectangleArea = (areaType: RectangleAreaType): Response => {
  if (areaType.fields[0] === 0) {
    return createResponse('error', 'Length cannot be 0!');
  }

  if (areaType.fields[1] === 0) {
    return createResponse('error', 'Breadth cannot be 0!');
  }

  return createResponse(
    'success',
    `Area of the Rectangle is ${(
      areaType.fields[0] * areaType.fields[1]
    ).toFixed(2)} squared units!`,
  );
};

const calculateSquareArea = (areaType: SquareAreaType): Response => {
  if (areaType.fields[0] === 0) {
    return createResponse('error', 'Side cannot be 0!');
  }

  return createResponse(
    'success',
    `Area of the square is ${(areaType.fields[0] * areaType.fields[0]).toFixed(
      2,
    )} squared units!`,
  );
};

const calculateEquilateralTriangleArea = (
  areaType: EquilateralTriangleAreaType,
): Response => {
  if (areaType.fields[0] === 0) {
    return createResponse('error', 'Side cannot be 0!');
  }

  return createResponse(
    'success',
    `Area of the equilateral triangle is ${(
      (1.732 * (areaType.fields[0] * areaType.fields[0])) /
      4
    ).toFixed(2)} squared units!`,
  );
};

const isTriangle = (areaType: AreaType) => {
  if (isIsocelesTriangleAreaType(areaType)) {
    const common = areaType.fields[0],
      base = areaType.fields[1];
    return common * 2 > base;
  }

  if (isScaleneTriangleAreaType(areaType)) {
    const a = areaType.fields[0],
      b = areaType.fields[1],
      c = areaType.fields[2];
    return a + b > c && b + c > a && c + a > b;
  }
};

const calculateIsocelesTriangleArea = (
  areaType: IsocelesTriangleAreaType,
): Response => {
  if (areaType.fields[0] === 0) {
    return createResponse('error', 'Common side cannot be 0!');
  }

  if (areaType.fields[1] === 0) {
    return createResponse('error', 'Base cannot be 0!');
  }

  if (!isTriangle(areaType)) {
    return createResponse('error', 'Triangle cannot be formed!');
  }

  const common = areaType.fields[0],
    base = areaType.fields[1];
  return createResponse(
    'success',
    `Area of the isoceles triangle is ${(
      0.5 *
      Math.sqrt(common * common - (base * base) / 4) *
      base
    ).toFixed(2)} squared units!`,
  );
};

const calculateScaleneTriangleArea = (
  areaType: ScaleneTriangleAreaType,
): Response => {
  if (areaType.fields[0] === 0) {
    return createResponse('error', 'Side 1 cannot be 0!');
  }

  if (areaType.fields[1] === 0) {
    return createResponse('error', 'Side 2 cannot be 0!');
  }

  if (areaType.fields[2] === 0) {
    return createResponse('error', 'Side 3 cannot be 0!');
  }

  if (!isTriangle(areaType)) {
    return createResponse('error', 'Triangle cannot be formed!');
  }

  const a = areaType.fields[0],
    b = areaType.fields[1],
    c = areaType.fields[2];
  const s = (a + b + c) / 2;
  return createResponse(
    'success',
    `Area of the scalene triangle is ${Math.sqrt(
      s * (s - a) * (s - b) * (s - c),
    ).toFixed(2)} squared units!`,
  );
};

export const calculateArea = (areaType: AreaType): Response => {
  if (isCircleAreaType(areaType)) {
    return calculateCircleArea(areaType);
  }

  if (isRectangleAreaType(areaType)) {
    return calculateRectangleArea(areaType);
  }

  if (isSquareAreaType(areaType)) {
    return calculateSquareArea(areaType);
  }

  if (isEquilateralTriangleAreaType(areaType)) {
    return calculateEquilateralTriangleArea(areaType);
  }

  if (isIsocelesTriangleAreaType(areaType)) {
    return calculateIsocelesTriangleArea(areaType);
  }

  if (isScaleneTriangleAreaType(areaType)) {
    return calculateScaleneTriangleArea(areaType);
  }

  return createResponse('error', 'Invalid area type!');
};
