import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState();
  const [En_num, setEn_num] = useState();
  const [password, setPassword] = useState();
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
            state: { En_num, subject: result.data.subject },
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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div
        className="d-flex justify-content-center align-items-center text-center vh-100"
        style={{
          backgroundImage:
            "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))",
        }}
      >
        <div className="bg-white p-3 rounded" style={{ width: "40%" }}>
          <h2 className="mb-3 text-primary">Login</h2>

          <div>
            Role
            <input
              type="radio"
              name="role"
              value="Student"
              defaultChecked
              required
              onChange={(e) => setRole(e.target.value)}
            />
            Student
            <input
              type="radio"
              name="role"
              value="Faculty"
              onChange={(e) => setRole(e.target.value)}
            />
            Faculty
          </div>

          <form onSubmit={handleSubmit}>
            {role === "Student" ? (
              <div className="mb-3 text-start">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  <strong>Enrollment Number</strong>
                </label>
                <input
                  type="number"
                  placeholder="Enter Enrollment Number"
                  className="form-control"
                  id="En_num"
                  minLength={12}
                  maxLength={12}
                  onChange={(event) => setEn_num(event.target.value)}
                  required
                />
              </div>
            ) : (
              <div className="mb-3 text-start">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  <strong>Email Id</strong>
                </label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="form-control"
                  id="exampleInputEmail1"
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
            )}

            <div className="mb-3 text-start">
              <label htmlFor="exampleInputPassword1" className="form-label">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="form-control"
                id="exampleInputPassword1"
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              onClick={role === "Student" ? UserLogin : FacultyLogin}
            >
              Login
            </button>
          </form>
          <p className="container my-2">Don&apos;t have an account?</p>
          <Link to="/register" className="btn btn-secondary">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
