const mongoose = require('mongoose');
const addStudentsModels = require('../../models/AllUser');

const StudentLoginController = async (req, res) => {
    const { En_num, password } = req.body;

    const user = await addStudentsModels.findOne({ En_num: En_num });

    if (user) {
        const isPasswordMatch = user.comparePassword(password);
        if (isPasswordMatch) {
            res.json('Success');
        } else {
            res.json('Wrong password');
        }
    } else {
        res.json('No records found!');
    }
};

module.exports = StudentLoginController;
