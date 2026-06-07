/**
 * Extrai uma mensagem legível de um erro do RTK Query / resposta NestJS.
 * O Nest retorna `{ statusCode, message, error }`, onde `message` pode ser
 * string ou string[] (erros de validação).
 */
export function getErrorMessage(error: unknown, fallback: string): string {
  if (
    error &&
    typeof error === 'object' &&
    'data' in error &&
    error.data &&
    typeof error.data === 'object' &&
    'message' in error.data
  ) {
    const message = (error.data as { message: string | string[] }).message;
    return Array.isArray(message) ? message[0] : message;
  }
  return fallback;
}
