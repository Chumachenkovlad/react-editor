export function createStorage(key: string, defaultValue: string = "") {
  return {
    getItem: () => localStorage.getItem(key) || defaultValue,
    setItem: (value: string) => localStorage.setItem(key, value)
  };
}
