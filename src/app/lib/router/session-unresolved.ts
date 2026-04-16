/**
 * true, пока ответ GET /users/me не зафиксировал ни успешную сессию, ни ошибку
 * (включая активный pending и промежуток idle→pending у React Query).
 */
export const isSessionUnresolved = (
  isSessionLoading: boolean,
  sessionConfirmed: boolean,
  sessionError: boolean
): boolean => {
  return isSessionLoading || (!sessionConfirmed && !sessionError);
};
