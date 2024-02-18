const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const FacultyLoginsModel = require("./models/FacultyLogin");
const addStudentsModels = require("./models/AllUser");
const StudentAtModels = require("./models/StudentAttendance");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/DE-Project");

app.post("/register", (req, res) => {
  const { email, subject, password } = req.body;
  FacultyLoginsModel.findOne({ email: email }).then((user) => {
    if (user) {
      res.json("Already registered");
    } else {
      FacultyLoginsModel.create(req.body)
        .then((log_reg_form) => res.json(log_reg_form))
        .catch((err) => res.json(err));
    }
  });
});

app.post("/Studentlogin", (req, res) => {
  // To find record from the database
  const { En_num, password } = req.body;
  addStudentsModels.findOne({ En_num: En_num }).then((user) => {
    if (user) {
      // If user found then these 2 cases
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("Wrong password");
      }
    }
    // If user not found then
    else {
      res.json("No records found! ");
    }
  });
});

app.post("/Facultylogin", (req, res) => {
  const { email, password } = req.body;
  FacultyLoginsModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          // If login is successful, send the subject name along with "Success"
          res.json({
            status: "Success",
            subject: user.subject,
            email: user.email,
          });
        } else {
          res.json("Wrong password");
        }
      } else {
        res.json("No records found! ");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    });
});

/****************ADD DATA STARTS***************/
app.get("/allUsers", (req, res) => {
  addStudentsModels
    .find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  addStudentsModels
    .findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.put("/updateUser/:id", (req, res) => {
  const id = req.params.id;
  addStudentsModels
    .findByIdAndUpdate(
      { _id: id },
      {
        name: req.body.name,
        email: req.body.email,
        En_num: req.body.En_num,
        password: req.body.password,
      }
    )
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  addStudentsModels
    .findByIdAndDelete({ _id: id })
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});

app.post("/createUser", (req, res) => {
  addStudentsModels
    .create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

/****************ADD DATA ENDS***************/

/****************FACULTY STARTS***************/

app.get("/getUser/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const user = await FacultyLoginsModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ subject: user.subject });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

/****************FACULTY ENDS***************/
const scannedDataSchema = new mongoose.Schema({
  data: [String],
  subject: String,
  date: String,
});
const ScannedData = mongoose.model("ScannedData", scannedDataSchema);
/****************Attendance  Start***************/

app.post("/api/addData", (req, res) => {
  const { data, subject, date } = req.body;

  Promise.all(
    data.map((item) => {
      return ScannedData.findOne({ data: item }).then((existingData) => {
        if (existingData) {
          console.log("Data already exists:", item);
          return Promise.resolve({ alreadyExists: true, data: item });
        } else {
          return ScannedData.create({
            data: item,
            subject: subject,
            date: date,
          }).then(() => {
            return { alreadyExists: false, data: item };
          });
        }
      });
    })
  )
    .then((results) => {
      const addedData = results.filter(
        (result) => result !== null && !result.alreadyExists
      );
      const alreadyExistingData = results.filter(
        (result) => result !== null && result.alreadyExists
      );
      console.log("Data added successfully:", addedData);
      console.log("Data already exists:", alreadyExistingData);

      if (addedData.length > 0) {
        res.json({ message: "Data added successfully", addedData });
      } else if (alreadyExistingData.length > 0) {
        res
          .status(400)
          .json({ error: "Data already exists", alreadyExistingData });
      } else {
        res.status(400).json({ error: "Failed to add data" });
      }
    })
    .catch((error) => {
      console.error("Error adding data:", error);
      res.status(500).json({ error: "Failed to add data" });
    });
});

/****************Attendance ENDS***************/

app.listen(3001, () => {
  console.log("Server listining on http://127.0.0.1:3001");
});
