import Home from "./Home";
import Login from "./Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./AddUser/Users";
import CreateUser from "./AddUser/CreateUser";
import UpdateUser from "./AddUser/UpdateUser";
import StudentHomePage from "./Student/StudentHomePage";
import FacultyHomePage from "./Faculty/FacultyHomePage";
import Scanner from "./Faculty/Scanner";
import ShowRecords from "./Faculty/ShowRecords";
import StudentRecords from "./Student/StudentRecords";
import AddFac from "./Admin/AddFac";
import AdminHomePage from "./Admin/AdminHomePage";
import AllFaculty from "./Admin/AllFaculty";
import UpdateFaculty from "./Admin/UpdateFaculty";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
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
          <Route path="/AdminHomePage" element={<AdminHomePage />} />

          <Route path="/createFac" element={<AddFac />} />
          <Route path="/updateFaculty/:id" element={<UpdateFaculty />} />
          <Route path="/allFaculty" element={<AllFaculty />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
