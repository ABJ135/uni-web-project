const user = require("../model/User.model");
const Attendence = require("../model/Attendence.model");

const createEmployee = async (req, res) => {
    try {
      const creator = await user.findById(req.user.id);
      
      if (!creator || (creator.role !== "Admin" && creator.role !== "HR")) {
          return res.status(403).json("You are not authorized to create attendence");
        }
        
        const data = req.body;
        toCreated = await user.findById(data.user_id);
  
          if (creator.role === "HR" && toCreated.role === "Admin") {
        return res
          .status(403)
          .json("HR is not authorized to create Admin attendence");
      }

      const object = await Attendence.create(data);
      res.status(201).json({ message: "Attendence created successfully", object });
    } catch (error) {
      console.log("Error creating Attendence:", error);
      res.status(500).json("Error creating Attendence");
    }
  };