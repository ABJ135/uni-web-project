const user = require("../model/User.model");
const payroll = require("../model/Payroll.model");
const employee = require("../model/Employee.model");

const createPayroll = async (req, res) => {
    try {
      const creator = await user.findById(req.user.id);
  
      if (!creator || (creator.role !== "Admin" && creator.role !== "HR")) {
        return res.status(403).json("You are not authorized to generate payroll");
      }
  
      const payrollData = req.body;
  
    
  
      const payrollRecord = await payroll.create(payrollData);
  
      return res.status(201).json({ message: "Payroll generated successfully", payrollRecord });
    } catch (error) {
      console.log("Error generating payroll:", error);
      res.status(500).json("Error generating payroll");
    }
  };
  
  const updatePayroll = async (req, res) => {
    try {
      const creator = await user.findById(req.user.id);
  
      if (!creator || (creator.role !== "Admin" && creator.role !== "HR")) {
        return res.status(403).json("You are not authorized to update payroll");
      }
  
      const { id } = req.params;
      const updateData = req.body;
  
      const payrollRecord = await payroll.findByIdAndUpdate(id, updateData, { new: true });
  
      if (!payrollRecord) {
        return res.status(404).json("Payroll record not found");
      }
  
      return res.status(200).json({ message: "Payroll updated successfully", payrollRecord });
    } catch (error) {
      console.log("Error updating payroll:", error);
      res.status(500).json("Error updating payroll");
    }
  };
  
  const viewPayroll = async (req, res) => {
    try {
      const viewer = await user.findById(req.user.id);
  
      if (!viewer) {
        return res.status(404).json("User not found");
      }
  
      if (viewer.role === "Admin" || viewer.role === "HR") {
        const payrollRecords = await payroll.find();
        return res.status(200).json({ payrollRecords });
      }
  
      const payrollRecords = await payroll.find({ employee_id: viewer.id });
  
      if (payrollRecords.length === 0) {
        return res.status(404).json("No payroll records found for this user");
      }
  
      return res.status(200).json({ payrollRecords });
    } catch (error) {
      console.log("Error fetching payroll:", error);
      res.status(500).json("Error fetching payroll");
    }
  };
  

module.exports = {
    createPayroll,
    updatePayroll,
    viewPayroll
};
