import { Router } from "express";

import BusinessRoutes from "../modules/business/business.routes.js";

import EmployeeRoutes from "../modules/people/employee/employee.routes.js";

import CustomerRoutes from "../modules/people/customer/customer.routes.js";

import CategoryRoutes from "../modules/catalog/category/category.routes.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Business
|--------------------------------------------------------------------------
*/

router.use("/businesses", BusinessRoutes);

/*
|--------------------------------------------------------------------------
| People
|--------------------------------------------------------------------------
*/

router.use("/employees", EmployeeRoutes);

router.use("/customers", CustomerRoutes);

/*
|--------------------------------------------------------------------------
| Catalog
|--------------------------------------------------------------------------
*/

router.use("/categories", CategoryRoutes);

export default router;