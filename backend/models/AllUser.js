const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const addStudentsSchema = mongoose.Schema({
    name: String,
    email: String,
    En_num: Number,
    password: String,
});

addStudentsSchema.methods.comparePassword = async function (studentPassword) {
    const isMatch = await bcrypt.compare(studentPassword, this.password);
    return isMatch;
};

const addStudentsModels = mongoose.model('addStudents', addStudentsSchema);
module.exports = addStudentsModels;