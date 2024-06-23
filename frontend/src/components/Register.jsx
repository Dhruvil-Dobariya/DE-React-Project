import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/Register.css";

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
      alert("Invalid Key");
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
    <div className="form-containers">
      <h2 style={{ fontSize: "30px" }}>Register</h2>
      <div className="info-text">
        <p className="Warn">Only For Faculty Members</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="input-group">
            <label>
              <strong>Faculty Key</strong>
            </label>
            <input
              type="password"
              placeholder="Faculty Key"
              required
              onChange={(e) => setFacultyKey(e.target.value)}
            />
          </div>
          <label htmlFor="exampleInputName">
            <strong>Name</strong>
          </label>
          <input
            type="text"
            placeholder="Enter Name"
            id="exampleInputName"
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
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
        <div className="form-group">
          <label htmlFor="subject">
            <strong>Select Subject</strong>
          </label>
          <select
            id="subject"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value="DE_2B">DE_2B</option>
            <option value="TOC">TOC</option>
            <option value="AJP">AJP</option>
            <option value="WP">WP</option>
            <option value="MPI">MPI</option>
            <option value="IOT">IOT</option>
            <option value="IPDC">IPDC</option>
          </select>
        </div>
        <div className="form-group">
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
        <button type="submit">Register</button>
      </form>
      <p>
        <div className="end">
          Already have an account? &nbsp;
          <Link className="login-link" to="/login">
            Login
          </Link>
        </div>
      </p>
    </div>
  );
};

export default Register;
