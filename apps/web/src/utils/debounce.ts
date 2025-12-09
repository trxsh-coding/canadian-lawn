type DebouncedFunction = {
  (values: number[]): void;
  clear: () => void;
};

export const debounce = (fn: (values: number[]) => void, ms: number = 300): DebouncedFunction => {
  let timeout: NodeJS.Timeout;
  const debounced = (values: number[]): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(values), ms);
  };

  debounced.clear = () => clearTimeout(timeout);

  return debounced;
};
