/*
|--------------------------------------------------------------------------
| Catalog Types
|--------------------------------------------------------------------------
*/

export const CATALOG_TYPES = Object.freeze({
  SERVICE: "service",

  PRODUCT: "product",
});

/*
|--------------------------------------------------------------------------
| Category Types
|--------------------------------------------------------------------------
*/

export const CATEGORY_TYPES = Object.freeze({
  SERVICE: "service",

  PRODUCT: "product",
});

/*
|--------------------------------------------------------------------------
| Product Types
|--------------------------------------------------------------------------
*/

export const PRODUCT_TYPES = Object.freeze({
  PHYSICAL: "physical",

  DIGITAL: "digital",

  SERVICE: "service",
});

/*
|--------------------------------------------------------------------------
| Unit Types
|--------------------------------------------------------------------------
*/

export const UNITS = Object.freeze({
  PIECE: "piece",

  BOX: "box",

  CARTON: "carton",

  PACKET: "packet",

  KG: "kg",

  GRAM: "gram",

  LITER: "liter",

  ML: "ml",

  DOZEN: "dozen",
});

/*
|--------------------------------------------------------------------------
| Tax Types
|--------------------------------------------------------------------------
*/

export const TAX_TYPES = Object.freeze({
  FIXED: "fixed",

  PERCENTAGE: "percentage",
});

/*
|--------------------------------------------------------------------------
| Discount Types
|--------------------------------------------------------------------------
*/

export const DISCOUNT_TYPES = Object.freeze({
  FIXED: "fixed",

  PERCENTAGE: "percentage",
});

/*
|--------------------------------------------------------------------------
| Price Types
|--------------------------------------------------------------------------
*/

export const PRICE_TYPES = Object.freeze({
  COST: "cost",

  SELLING: "selling",

  WHOLESALE: "wholesale",

  MEMBER: "member",
});

/*
|--------------------------------------------------------------------------
| Inventory Actions
|--------------------------------------------------------------------------
*/

export const STOCK_ACTIONS = Object.freeze({
  PURCHASE: "purchase",

  SALE: "sale",

  RETURN: "return",

  DAMAGE: "damage",

  ADJUSTMENT: "adjustment",

  TRANSFER: "transfer",
});

/*
|--------------------------------------------------------------------------
| Barcode Types
|--------------------------------------------------------------------------
*/

export const BARCODE_TYPES = Object.freeze({
  QR: "qr",

  CODE128: "code128",

  EAN13: "ean13",
});

/*
|--------------------------------------------------------------------------
| Service Duration (Minutes)
|--------------------------------------------------------------------------
*/

export const SERVICE_DURATIONS = Object.freeze([
  15,

  30,

  45,

  60,

  90,

  120,

  180,
]);

/*
|--------------------------------------------------------------------------
| Default Category Color
|--------------------------------------------------------------------------
*/

export const DEFAULT_CATEGORY_COLOR = "#2196F3";
