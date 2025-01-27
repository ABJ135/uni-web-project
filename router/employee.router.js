const express = require("express");
const router = express.Router();
const employeeController = require("../controller/employee.controller");
const auth = require("../controller/auth");

router.post("/createEmployee", auth, employeeController.createEmployee);

router.get("/getEmployee/:id", auth, employeeController.getEmployee);

router.put("/updateEmployee/:id", auth, employeeController.updateEmployee);

router.delete("/deleteEmployee/:id", auth, employeeController.deleteEmployee);

router.get("/showAllEmployees", auth, employeeController.showAllEmployees);

module.exports = router;
