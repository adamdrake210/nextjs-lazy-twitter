export const convertArrayToObj = (array: string[], key: string) => {
  const initialValue = {};

  const object = array.reduce(
    (obj, item) => ({
      ...obj,
      [`${key}${array.indexOf(item)}`]: item,
    }),
    initialValue
  );
  return object;
};
