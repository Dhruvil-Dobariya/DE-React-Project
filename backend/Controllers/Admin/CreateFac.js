const CreateFaculty = require("../../models/CreateFaculty");
const bcrypt = require("bcryptjs");

const AddFacController = async (req, res) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    password: req.body.password,
  };
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);
  CreateFaculty.create(req.body)
    .then(() => res.json(user))
    .catch((err) => res.json(err));
};

module.exports = AddFacController;
