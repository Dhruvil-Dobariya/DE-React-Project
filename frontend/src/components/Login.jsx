import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [En_num, setEn_num] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");

  const navigate = useNavigate();

  const UserLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/Studentlogin", { En_num, password })
      .then((result) => {
        console.log(result);
        if (result.data === "Success") {
          console.log("Login Success");
          alert("Login successful!");
          navigate("/StudentHomePage", {
            state: { En_num },
          });
        } else {
          alert("Incorrect password! Please try again.");
        }
      })
      .catch((err) => console.log(err));
  };

  const FacultyLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/Facultylogin", { email, password })
      .then((result) => {
        console.log(result);
        if (result.data.status === "Success") {
          console.log("Login Success");
          alert("Login successful!");
          navigate("/FacultyHomePage", {
            state: { subject: result.data.subject, email: result.data.email },
          });
        } else {
          alert("Incorrect password! Please try again.");
        }
      })
      .catch((err) => console.log(err));
  };

  const AdminLogin = (e) => {
    e.preventDefault();
    if (email === "admin123@gmail.com" && password === "Admin@123") {
      console.log("Login Success");
      alert("Login successful!");
      navigate("/AdminHomePage");
    } else {
      alert("Incorrect admin credentials! Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === "Student") {
      UserLogin(e);
    } else if (role === "Faculty") {
      FacultyLogin(e);
    } else if (role === "Admin") {
      AdminLogin(e);
    }
  };

  return (
    <div className="containers">
      <h2 style={{ fontSize: "30px" }}>Login</h2>
      <div className="role-selection">
        <label htmlFor="role-student">Role</label>
        <input
          type="radio"
          name="role"
          id="role-student"
          value="Student"
          defaultChecked
          required
          onChange={(e) => setRole(e.target.value)}
        />
        <label htmlFor="role-student">Student</label>
        <input
          type="radio"
          name="role"
          id="role-faculty"
          value="Faculty"
          onChange={(e) => setRole(e.target.value)}
        />
        <label htmlFor="role-faculty">Faculty</label>

        <input
          type="radio"
          name="role"
          id="role-admin"
          value="Admin"
          onChange={(e) => setRole(e.target.value)}
        />
        <label htmlFor="role-admin">Admin</label>
      </div>

      <form onSubmit={handleSubmit}>
        {role === "Student" ? (
          <div className="student-field">
            <label htmlFor="En_num">
              <strong>Enrollment Number</strong>
            </label>
            <input
              type="number"
              placeholder="Enter Enrollment Number"
              id="En_num"
              minLength={12}
              maxLength={12}
              onChange={(event) => setEn_num(event.target.value)}
              required
            />
          </div>
        ) : (
          <div className="faculty-admin-field">
            <label htmlFor="exampleInputEmail1">
              <strong>Email Id</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              id="exampleInputEmail1"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
        )}

        <div className="password-field">
          <label htmlFor="exampleInputPassword1">
            <strong>Password</strong>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            id="exampleInputPassword1"
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
