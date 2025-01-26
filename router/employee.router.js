const express = require("express");
const router = express.Router();
const employeeController = require("../controller/employee.controller");
const auth = require("../controller/auth");

// Routes for employee operations
router.post("/createEmployee/:id", auth, employeeController.createEmployee); 
router.get("/getEmployee/:id", auth, employeeController.getEmployee); 
router.put("/updateEmployee/:id", auth, employeeController.updateEmployee); 
router.delete("/deleteEmployee/:id", auth, employeeController.deleteEmployee); 

module.exports = router;
