export const sortByActiveIndex = <T extends unknown[]>(
  array: T,
  activeIndex: number
): T => {
  const start = array.slice(activeIndex);
  const end = array.slice(0, activeIndex);
  return start.concat(end) as T;
};
