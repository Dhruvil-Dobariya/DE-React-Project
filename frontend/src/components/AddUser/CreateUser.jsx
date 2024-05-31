import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../Styles/CreateUser.css";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [En_num, setEn_num] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/createUser", {
        name: name,
        email: email,
        En_num: En_num,
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
        <h2 style={{ fontSize: "30px" }}>Add Student</h2>
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
          <label htmlFor="en_num">Enrollment Number</label>
          <input
            type="text"
            id="en_num"
            placeholder="Enter Enrollment Number"
            className="form-control"
            required
            minLength={12}
            maxLength={12}
            onChange={(e) => setEn_num(e.target.value)}
          />
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

export default CreateUser;
