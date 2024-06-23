import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../Styles/CreateUser.css";

const AddFac = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/createFac", {
        name: name,
        email: email,
        subject: subject,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        alert("User added successfully");
        navigate("/allUsers");
      })
      .catch((error) => {
        console.error("Error adding user:", error);
        alert("Failed to add user");
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={submit}>
        <h2 style={{ fontSize: "30px" }}>Add Faculty</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter Name"
            className="form-control"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            className="form-control"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            className="form-control"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddFac;
