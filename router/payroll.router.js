const express = require("express");
const router = express.Router();
const payrollController = require("../controller/payroll.controller");
const auth = require("../controller/auth");

router.post("/createPayroll",auth,payrollController.createPayroll)

router.put("/updatePayroll/:id",auth,payrollController.updatePayroll)

router.get("/viewPayroll",auth,payrollController.viewPayroll)

module.exports = router;

