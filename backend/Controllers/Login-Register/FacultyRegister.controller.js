const mongoose = require('mongoose');
const FacultyLoginsModel = require('../../models/FacultyLogin');
const bcrypt = require('bcryptjs');

const FacultyRegisterController = async (req, res) => {
    const { email, subject, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(password, salt);
    FacultyLoginsModel.findOne({ email: email }).then((user) => {
        if (user) {
            res.json('Already registered');
        } else {
            FacultyLoginsModel.create(req.body)
                .then((log_reg_form) => res.json(log_reg_form))
                .catch((err) => res.json(err));
        }
    });
};

module.exports = FacultyRegisterController;