import Business from "../modules/business/business.model.js";

const checkBusiness = async (req, res, next) => {
  try {
    const businessId = req.headers["x-business-id"];

    if (!businessId) {
      return res.status(400).json({
        success: false,
        message: "Business ID is required.",
      });
    }

    const business = await Business.findById(businessId);

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "Business not found.",
      });
    }

    req.business = business;

    next();
  } catch (error) {
    next(error);
  }
};

export default checkBusiness;
