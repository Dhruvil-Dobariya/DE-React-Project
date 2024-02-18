import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./AddUser/Users";
import CreateUser from "./AddUser/CreateUser";
import UpdateUser from "./AddUser/UpdateUser";
import StudentHomePage from "./Student/StudentHomePage";
import FacultyHomePage from "./Faculty/FacultyHomePage";
import { useState } from "react";
import Scanner from "./Faculty/Scanner";
import ScannedData from "./Faculty/ScannedData";

function App() {
  const [email, setEmail] = useState([]);
  const [En_num, setEn_num] = useState([]);
  const [password, setPassword] = useState([]);

  function getFromChild(data) {
    console.log(data);
    setEmail(data.email);
    setPassword(data.password);
    setEn_num(data.En_num);
  }
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login getFromChild={getFromChild} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />

          <Route path="/allUsers" element={<Users />} />
          <Route path="/createUser" element={<CreateUser />} />
          <Route path="/updateUser/:id" element={<UpdateUser />} />
          <Route path="/Scanner" element={<Scanner type={"QR"} />} />
          <Route path="/ScannedData" element={<ScannedData />} />

          <Route
            path="/StudentHomePage"
            element={<StudentHomePage En_num={En_num} password={password} />}
          />
          <Route path="/FacultyHomePage" element={<FacultyHomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
