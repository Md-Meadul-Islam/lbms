const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;
/**
 * router.get(
    "/",
    asyncHandler(async (req, res) => {

        const users = await User.find();

        res.json(users);

    })
);
No more try/catch in every controller.
 */
