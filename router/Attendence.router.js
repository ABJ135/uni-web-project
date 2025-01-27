const express = require("express");
const router = express.Router();
const attendenceController = require("../controller/Attendence.controller");
const auth = require("../controller/auth");

router.post("/createAttendence",auth,attendenceController.createAttendence)

router.get("/showAttendance",auth,attendenceController.showAttendance)

router.put("/modifyAttendance/:id",auth,attendenceController.modifyAttendance)

module.exports = router;
