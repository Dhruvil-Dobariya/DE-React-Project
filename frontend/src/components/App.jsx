import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./AddUser/Users";
import CreateUser from "./AddUser/CreateUser";
import UpdateUser from "./AddUser/UpdateUser";
import StudentHomePage from "./Student/StudentHomePage";
import FacultyHomePage from "./Faculty/FacultyHomePage";
import Scanner from "./Faculty/Scanner";
import ShowRecords from "./Faculty/ShowRecords";
import StudentRecords from "./Student/StudentRecords";
import "../styles.css";

function App() {
  // function getFromChild(data) {
  //   console.log(data);
  //   setEmail(data.email);
  //   setPassword(data.password);
  //   setEn_num(data.En_num);
  //   console.log("aaaa", email, En_num, password);
  // }
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/" element={<Login getFromChild={getFromChild} />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />

          <Route path="/allUsers" element={<Users />} />
          <Route path="/createUser" element={<CreateUser />} />
          <Route path="/updateUser/:id" element={<UpdateUser />} />
          <Route path="/Scanner" element={<Scanner />} />
          <Route path="/ShowRecords" element={<ShowRecords />} />
          <Route path="/StudentRecords" element={<StudentRecords />} />

          <Route path="/StudentHomePage" element={<StudentHomePage />} />
          <Route path="/FacultyHomePage" element={<FacultyHomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
