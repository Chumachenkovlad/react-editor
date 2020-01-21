export const isEnterKeyEvent = <T extends KeyboardEvent>(event: T): boolean => {
  return event.key === "Enter";
};

export const isEscKeyEvent = <T extends KeyboardEvent>(event: T): boolean => {
  return event.key === "Esc";
};
