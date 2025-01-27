const user = require("../model/User.model");
const Attendence = require("../model/Attendence.model");
const employee = require("../model/Employee.model");

const createAttendence = async (req, res) => {
  try {
    const creator = await user.findById(req.user.id);

    if (!creator || (creator.role !== "Admin" && creator.role !== "HR")) {
      return res
        .status(403)
        .json("You are not authorized to create attendence");
    }

    const data = req.body;
    toCreated = await user.findById(data.employee_id);

    if (creator.role === "HR" && toCreated.role === "Admin") {
      return res
        .status(403)
        .json("HR is not authorized to create Admin attendence");
    }

    const object = await Attendence.create(data);
    res
      .status(201)
      .json({ message: "Attendence created successfully", object });
  } catch (error) {
    console.log("Error creating Attendence:", error);
    res.status(500).json("Error creating Attendence");
  }
};

const showAttendance = async (req, res) => {
  try {
    const viewer = await user.findById(req.user.id);

    if (!viewer) {
      return res.status(404).json("User not found");
    }

    if (viewer.role === "Admin" || viewer.role === "HR") {
      const attendances = await Attendence.find().populate("employee_id");
      return res.status(200).json({ attendances });
    }

    const attendances = await Attendence.find({ employee_id: viewer.id }).populate("employee_id");

    if (attendances.length === 0) {
      return res.status(404).json("No attendance records found for this user");
    }

    return res.status(200).json({ attendances });

  } catch (error) {
    console.log("Error fetching attendance:", error);
    res.status(500).json("Error fetching attendance");
  }
};

const modifyAttendance = async (req, res) => {
  try {
    const viewer = await user.findById(req.user.id);

    if (!viewer || viewer.role !== "Admin") {
      return res.status(403).json("You are not authorized to modify attendance");
    }

    const { id } = req.params;
    const  updateData  = req.body;
    const attendance = await Attendence.findByIdAndUpdate(id, updateData, { new: true });

    if (!attendance) {
      return res.status(404).json("Attendance not found");
    }

    return res.status(200).json({ message: "Attendance modified successfully", attendance });
  } catch (error) {
    console.log("Error modifying attendance:", error);
    res.status(500).json("Error modifying attendance");
  }
};


module.exports = {
  createAttendence,
  showAttendance,
  modifyAttendance
};
