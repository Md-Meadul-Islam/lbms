export const startOfDay = (date = new Date()) => {
  const d = new Date(date);

  d.setHours(0, 0, 0, 0);

  return d;
};

export const endOfDay = (date = new Date()) => {
  const d = new Date(date);

  d.setHours(23, 59, 59, 999);

  return d;
};

export const formatDate = (date) => {
  return new Date(date).toISOString();
};
/**
 * const todayStart = startOfDay();

const todayEnd = endOfDay();
 */
