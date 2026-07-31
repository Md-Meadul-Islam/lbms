const omit = (object, keys = []) => {
  const result = { ...object };

  keys.forEach((key) => {
    delete result[key];
  });

  return result;
};

export default omit;
/**
 * const response = omit(user.toObject(), [
    "password",
    "__v",
]);
 */
