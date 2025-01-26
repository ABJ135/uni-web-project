const user = require("../model/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createAdmin = async (req, res) => {
  try {
    const data = req.body;
    let pass = data.password;
    pass = await bcrypt.hash(pass, 10);
    data.password = pass;

    const object = await user.create(data);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error creating user");
  }
};

const createUser = async (req, res) => {
  const data = req.body;
  let pass = data.password;
  pass = await bcrypt.hash(pass, 10);
  data.password = pass;

  if (!req.user.id) {
    return res.status(401).json("user id from token not fetched");
  }
  const creater = await user.findById(req.user.id);

  if (creater.role === "Admin") {
    try {
      const object = await user.create(data);
      return res.status(200).json({ message: "User created by admin", object });
    } catch (error) {
      console.log("Error creating user :", error);
      return res.status(500).json("Error creating user");
    }
  }

  if (creater.role === "HR") {
    if (data.role === "Admin") {
      return res.status(500).json("HR cannot create Admin");
    } else {
      try {
        const object = await user.create(data);
        return res.status(200).json({ message: "User created by HR", object });
      } catch (error) {
        console.log("Error creating user :", error);
        return res.status(500).json("Error creating user");
      }
    }
  }

  if (creater.role === "Manager" || creater.role === "Employee") {
    return res
      .status(500)
      .json("Manager and Employee are not authorized to create user");
  }
};

const login = async (req, res) => {
  try {
    const data = req.body;
    const email = await user.findOne({ email: data.email });

    console.log(email.password, data.password);

    if (email && validate(email.password, data.password)) {
      const token = jwt.sign({ id: email._id }, process.env.Jwt_key);
      res.status(200).json({ message: "login successfull", token: token });
    }
  } catch (error) {
    console.log(error, "this is error");
    res.status(500).json("Error in login");
  }
};

const validate = async (haash, simple) => {
  if (!haash || !simple) {
    console.log("one is missing");
  }
  const v = await bcrypt.compare(simple, haash);
  return v;
};

const showUsers = async (req, res) => {
  const viewer = await user.findById(req.user.id);

  if (!viewer) {
    return res.status(401).json("viewer is invalid");
  }

  if (viewer.role === "Admin" || viewer.role === "HR") {
    try {
      const object = await user.find();
      return res.status(200).json({ message: "users list is ", object });
    } catch (error) {
      console.log("Error in viewing data", error);
      return res.status(500).json(" Error viewing data");
    }
  } else {
    return res
      .status(401)
      .json("You are not authorised to view data of all users");
  }
};

const deleteUser = async (req, res) => {
  const person = await user.findById(req.user.id);
  if (!person) {
    return res.status(401).json("Authorizatioin failed");
  }
  const id = req.params.id;
  const toDelete = await user.findById(id);

  if (!toDelete) {
    return res.status(401).json("User to be deleted is not found");
  }

  if (person.role === "Admin") {
    try {
      const object = await user.findByIdAndDelete(id);
      return res.status(200).json({ message: "User deleted is", object });
    } catch (error) {
      console.log("Error deleting user", error);
      return res.status(500).json("Error deleting user");
    }
  }

  if (person.role === "HR") {
    if (toDelete.role === "Admin") {
      return res.status(401).json("you cannot delete Admin");
    } else {
      try {
        const object = await user.findByIdAndDelete(id);
        return res.status(200).json({ message: "User deleted is", object });
      } catch (error) {
        console.log("Error deleting user", error);
        return res.status(500).json("Error deleting user");
      }
    }
  }

  if(person.role === 'Manager'  || person.role === 'Employee'){
    if (person.id.equals(toDelete.id)){
        try {
            const object = await user.findByIdAndDelete(id);
            return res.status(200).json({ message: "User deleted is", object });
          } catch (error) {
            console.log("Error deleting user", error);
            return res.status(500).json("Error deleting user");
          }
    }
    else
    {
        return res.status(401).json("you are not authorised to delete other users") 
    }
  }
};

const updateUser = async (req, res) => {
    const person = await user.findById(req.user.id);
    if (!person) {
      return res.status(401).json("Authorization failed");
    }
  
    const id = req.params.id;
    const toUpdate = await user.findById(id);
  
    if (!toUpdate) {
      return res.status(404).json("User to be updated is not found");
    }
  
    const updates = req.body; 
  
    if (person.role === "Admin") {
      try {
        const updatedObject = await user.findByIdAndUpdate(id, updates, {
          new: true,
        });
        return res.status(200).json({ message: "User updated", updatedObject });
      } catch (error) {
        console.log("Error updating user", error);
        return res.status(500).json("Error updating user");
      }
    }
  
    if (person.role === "HR") {
      if (toUpdate.role === "Admin") {
        return res.status(401).json("You cannot update an Admin");
      } else {
        try {
          const updatedObject = await user.findByIdAndUpdate(id, updates, {
            new: true,
          });
          return res.status(200).json({ message: "User updated", updatedObject });
        } catch (error) {
          console.log("Error updating user", error);
          return res.status(500).json("Error updating user");
        }
      }
    }
  
    if (person.role === "Manager" || person.role === "Employee") {
      if (person.id.equals(toUpdate.id)) {
        try {
          const updatedObject = await user.findByIdAndUpdate(id, updates, {
            new: true,
          });
          return res.status(200).json({ message: "User updated", updatedObject });
        } catch (error) {
          console.log("Error updating user", error);
          return res.status(500).json("Error updating user");
        }
      } else {
        return res
          .status(401)
          .json("You are not authorized to update other users");
      }
    }
  };
  

module.exports = {
  createAdmin,
  createUser,
  login,
  showUsers,
  deleteUser,
  updateUser
};
