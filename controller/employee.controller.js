const employee = require("../model/Employee.model");
const user = require("../model/User.model");

const createEmployee = async (req, res) => {
    try {
      const creator = await user.findById(req.user.id);
      
      if (!creator || (creator.role !== "Admin" && creator.role !== "HR")) {
          return res.status(403).json("You are not authorized to create employees");
        }
        
        const data = req.body;
        toCreated = await user.findById(data.user_id);
  
          if (creator.role === "HR" && toCreated.role === "Admin") {
        return res
          .status(403)
          .json("HR is not authorized to create Admin profiles");
      }

      const object = await employee.create(data);
      res.status(201).json({ message: "Employee created successfully", object });
    } catch (error) {
      console.log("Error creating employee:", error);
      res.status(500).json("Error creating employee");
    }
  };
  
const getEmployee = async (req, res) => {
  try {
    const requester = await user.findById(req.user.id);
    const { id } = req.params;

    if (!requester) {
      return res.status(401).json("Unauthorized");
    }

    if (requester.role === "Admin" || requester.role === "HR") {
      const object = await employee.findById(id);
      if (!object) {
        return res.status(404).json("Employee not found");
      }
      return res.status(200).json(object);
    }

    if (requester.role === "Manager") {
      const object = await employee.findById(id).populate("user_id");
      if (!object || !object.user_id.equals(requester._id)) {
        return res.status(403).json("You are not authorized to view this employee");
      }
      return res.status(200).json(object);
    }

    if (requester.role === "Employee") {
      if (!requester._id.equals(id)) {
        return res.status(403).json("You can only view your own profile");
      }
      const object = await employee.findById(id);
      return res.status(200).json(object);
    }

    res.status(403).json("Access denied");
  } catch (error) {
    console.log("Error fetching employee:", error);
    res.status(500).json("Error fetching employee");
  }
};

const updateEmployee = async (req, res) => {
  try {
    const updater = await user.findById(req.user.id);
    const { id } = req.params;
    const updates = req.body;

    if (!updater) {
      return res.status(401).json("Unauthorized");
    }

    const object = await employee.findById(id);
    if (!object) {
      return res.status(404).json("Employee not found");
    }

    if (updater.role === "Admin" || updater.role === "HR") {
      const updatedEmployee = await employee.findByIdAndUpdate(id, updates, {
        new: true,
      });
      return res.status(200).json({ message: "Employee updated", updatedEmployee });
    }

    if (updater.role === "Manager") {
      if (!object.user_id.equals(updater._id)) {
        return res.status(403).json("You are not authorized to update this employee");
      }
      const updatedEmployee = await employee.findByIdAndUpdate(id, updates, {
        new: true,
      });
      return res.status(200).json({ message: "Employee updated", updatedEmployee });
    }

    if (updater.role === "Employee") {
      if (!updater._id.equals(employee.user_id)) {
        return res.status(403).json("You can only update your own profile");
      }

      const restrictedUpdates = ["salary", "department", "job_role"];
      for (const field of Object.keys(updates)) {
        if (restrictedUpdates.includes(field)) {
          return res.status(403).json(`You cannot update the field: ${field}`);
        }
      }

      const updatedEmployee = await employee.findByIdAndUpdate(id, updates, {
        new: true,
      });
      return res.status(200).json({ message: "Profile updated", updatedEmployee });
    }

    res.status(403).json("Access denied");
  } catch (error) {
    console.log("Error updating employee:", error);
    res.status(500).json("Error updating employee");
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const deleter = await user.findById(req.user.id);
    const { id } = req.params;

    if (!deleter) {
      return res.status(401).json("Unauthorized");
    }

    const object = await employee.findById(id);
    if (!object) {
      return res.status(404).json("Employee not found");
    }

    if (deleter.role === "Admin" || (deleter.role === "HR" && object.user_id.role !== "Admin")) {
      await employee.findByIdAndDelete(id);
      return res.status(200).json({ message: "Employee deleted" });
    }

    if (deleter.role === "Manager" || deleter.role === "Employee") {
      if (deleter._id.equals(employee.user_id)) {
        await employee.findByIdAndDelete(id);
        return res.status(200).json({ message: "Profile deleted" });
      }
      return res.status(403).json("You cannot delete this employee");
    }

    res.status(403).json("Access denied");
  } catch (error) {
    console.log("Error deleting employee:", error);
    res.status(500).json("Error deleting employee");
  }
};

const showAllEmployees = async (req, res) => {
    try {
      const requester = await user.findById(req.user.id);
  
      if (!requester) {
        return res.status(401).json("Unauthorized");
      }
  
      if (requester.role === "Admin" || requester.role === "HR") {
        const object = await employee.find().populate("user_id");
        if (!object) {
          return res.status(404).json("Employee not found");
        }
        return res.status(200).json(object);
      }
  
      if (requester.role === "Manager" || requester.role === "Employee") {
        
          return res.status(403).json("You are not authorized to view employee profiles");
      }
  
  
    } catch (error) {
      console.log("Error fetching employee:", error);
      res.status(500).json("Error fetching employee");
    }
  };

module.exports = {
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  showAllEmployees
};
