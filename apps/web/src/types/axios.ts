import type { AxiosError } from 'axios';

export function isAxiosError<T>(candidate: unknown): candidate is AxiosError<T> {
  return candidate && typeof candidate === 'object' && 'isAxiosError' in candidate ? true : false;
}
