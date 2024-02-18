import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [En_num, setEn_num] = useState();
  const [password, setPassword] = useState();
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
      .then((result) => {
        console.log(result);
        console.log(name, email, En_num, password);
        alert("added");
        navigate("/allUsers");
      })
      .catch((err) => console.log(err), alert("not added"));
  };

  return (
    <div className="d-flex vh-100 bg-info justify-content-center align-items-center">
      <div className="w-75 bg-white rounded p-3">
        <form onSubmit={submit}>
          <h2>Add User</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Email</label>
            <input
              type="text"
              placeholder="Enter Email"
              className="form-control"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Enrollment Number</label>
            <input
              type="number"
              placeholder="Enter Enrollment Number"
              className="form-control"
              required
              minLength={12}
              maxLength={12}
              onChange={(e) => setEn_num(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Password</label>
            <input
              type="password"
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
    </div>
  );
};

export default CreateUser;
