export type SuccessResponse = {type: 'success'; message: string};
export type ErrorResponse = {type: 'error'; message: string};
export type Response = SuccessResponse | ErrorResponse;

export const createResponse = (
  type: 'success' | 'error',
  message: string,
): Response => ({
  type,
  message,
});

export const isSuccessResponse = (
  response: Response,
): response is SuccessResponse => response.type === 'success';
export const isErrorResponse = (
  response: Response,
): response is ErrorResponse => response.type === 'error';
