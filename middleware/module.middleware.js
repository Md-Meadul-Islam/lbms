const checkModule = (moduleName) => {
  return (req, res, next) => {
    if (!req.business.enabledModules.includes(moduleName)) {
      return res.status(403).json({
        success: false,
        message: `${moduleName} module is disabled.`,
      });
    }

    next();
  };
};

export default checkModule;
/**
 * router.use(checkModule("services"));
 */
