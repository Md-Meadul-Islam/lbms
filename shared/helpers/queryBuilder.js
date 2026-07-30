const buildQuery = (query = {}, allowedFields = []) => {
  const filter = {};

  allowedFields.forEach((field) => {
    if (query[field] !== undefined && query[field] !== "") {
      filter[field] = query[field];
    }
  });

  if (query.keyword) {
    filter.$or = allowedFields.map((field) => ({
      [field]: {
        $regex: query.keyword,
        $options: "i",
      },
    }));
  }

  return filter;
};

export default buildQuery;
/**
const filter = buildQuery(req.query, [
    "name",
    "status",
    "category",
]);

const services = await Service.find(filter);
 */
