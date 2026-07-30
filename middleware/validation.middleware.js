import { validationResult } from "express-validator";

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,

      errors: errors.array(),
    });
  }

  next();
};

export default validate;
/**
 * body("name")
.notEmpty()

body("price")
.isNumeric()

validate
 */
