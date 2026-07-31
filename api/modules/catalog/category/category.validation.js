import { body } from "express-validator";

import { CATEGORY_TYPES } from "../../../shared/constants/index.js";

export const createCategoryValidation = [
  body("name").trim().notEmpty().withMessage("Category name is required."),

  body("type").optional().isIn(Object.values(CATEGORY_TYPES)),

  body("description").optional().isString(),

  body("color").optional().isHexColor().withMessage("Invalid color."),

  body("displayOrder").optional().isInt({
    min: 0,
  }),

  body("parentId").optional().isMongoId(),

  body("isFeatured").optional().isBoolean(),

  body("isDefault").optional().isBoolean(),
];

export const updateCategoryValidation = [
  body("name").optional().trim(),

  body("type").optional().isIn(Object.values(CATEGORY_TYPES)),

  body("description").optional().isString(),

  body("color").optional().isHexColor(),

  body("displayOrder").optional().isInt({
    min: 0,
  }),

  body("parentId").optional().isMongoId(),

  body("isFeatured").optional().isBoolean(),

  body("isDefault").optional().isBoolean(),
];

export const changeCategoryStatusValidation = [
  body("status").notEmpty().withMessage("Status is required."),
];
