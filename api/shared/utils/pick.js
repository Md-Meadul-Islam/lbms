const pick = (object, keys = []) => {
  return keys.reduce((acc, key) => {
    if (object[key] !== undefined) {
      acc[key] = object[key];
    }

    return acc;
  }, {});
};

export default pick;
/*
const data = pick(req.body, [
    "name",
    "price",
    "duration",
]);
 */
