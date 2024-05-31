const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const FacultyLoginController = require("./Controllers/Login-Register/Facultylogin.controller");
const FacultyRegisterController = require("./Controllers/Login-Register/FacultyRegister.controller");
const StudentLoginController = require("./Controllers/Login-Register/StudentLogin.controller");

const AddStudentController = require("./Controllers/AddStudents/AddStudent.controller");
const DeleteStudentController = require("./Controllers/AddStudents/DeleteStudent.controller");
const UpdateStudentController = require("./Controllers/AddStudents/UpdateStudent.controller");
const GetStudentController = require("./Controllers/AddStudents/GetStudent.controller");
const GetStudentById = require("./Controllers/AddStudents/GetStudentById");

const StoreScannerData = require("./Controllers/StoreScannerData");
const AddAbsent = require("./Controllers/AddAbsent");
const ShowRecords = require("./Controllers/ShowRecords");
const StudentRecords = require("./Controllers/StudentRecords");

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  req.db = mongoose.connection;
  next();
});
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/DE-Project");

/****************LOGIN/REGISTERS***************/
app.post("/register", FacultyRegisterController);
app.post("/Studentlogin", StudentLoginController);
app.post("/Facultylogin", FacultyLoginController);

/****************ADD NEW STUDENTS***************/
app.get("/allUsers", GetStudentController);
app.get("/getUser/:id", GetStudentById);
app.put("/updateUser/:id", UpdateStudentController);
app.delete("/deleteUser/:id", DeleteStudentController);
app.post("/createUser", AddStudentController);

app.post("/StoreData", StoreScannerData);
app.post("/AddAbsent", AddAbsent);
app.get("/ShowRecords", ShowRecords);
app.get("/StoreData/:subject", StudentRecords);

app.listen(3001, () => {
  console.log("Server listining on http://127.0.0.1:3001");
});
