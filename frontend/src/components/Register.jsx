import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [subject, setSubject] = useState();
  const [FacultyKey, setFacultyKey] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    if (FacultyKey !== "Faculty") {
      e.preventDefault();
      alert("Invalid Admin");
    } else {
      e.preventDefault();

      axios
        .post("http://localhost:3001/register", {
          name,
          email,
          subject,
          password,
        })
        .then((result) => {
          console.log(result);
          if (result.data === "Already registered") {
            alert("E-mail already registered! Please Login to proceed.");
            navigate("/login");
          } else {
            alert("Registered successfully! Please Login to proceed.");
            navigate("/login");
          }
        })
        .catch((err) => console.log(err));
    }
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
          <h2 className="mb-2 text-primary">Register</h2>
          <div
            style={{
              color: "white",
              backgroundColor: "tomato",
              margin: "0",
              padding: "0",
            }}
          >
            <p>Only For Faculty Members</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
              <div className="mb-3">
                <label className="form-label">
                  <strong>Faculty Key</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Faculty Key"
                  required
                  onChange={(e) => setFacultyKey(e.target.value)}
                />
              </div>
              <label htmlFor="exampleInputEmail1" className="form-label">
                <strong>Name</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                className="form-control"
                id="exampleInputname"
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
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
            <div className="mb-3 text-start">
              <label htmlFor="subject" className="form-label"></label>
              <strong> Select Subject</strong>
              <select
                id="subject"
                name="subject"
                value={subject}
                className="form-control"
                onChange={(e) => setSubject(e.target.value)}
              >
                <option value="maths-3">Maths-3</option>
                <option value="Data Structure">Data Structure</option>
                <option value="Operating System">Operating System</option>
                <option value="Indian Constitution">Indian Constitution</option>
                <option value="Python For Data Science">
                  Python For Data Science
                </option>
                <option value="Software Engineering">
                  Software Engineering
                </option>
                <option value="Computer Networks">Computer Networks</option>
              </select>
            </div>
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
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>

          <p className="container my-2">Already have an account ?</p>
          <Link to="/login" className="btn btn-secondary">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
