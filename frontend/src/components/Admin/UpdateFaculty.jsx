import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../Styles/UpdateUser.css";

const UpdateFaculty = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/getFaculty/" + id)
      .then((result) => {
        const userData = result.data;
        setName(userData.name);
        setEmail(userData.email);
        setSubject(userData.subject);
        setPassword(userData.password);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const update = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3001/updateFaculty/" + id, {
        name: name,
        email: email,
        subject: subject,
        password: password,
      })
      .then(() => {
        navigate("/allFaculty");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="update-user-container">
      <form className="update-user-form" onSubmit={update}>
        <h2 style={{ fontSize: "30px" }}>Update Faculty</h2>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateFaculty;
