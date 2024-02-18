import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateUser = () => {
  const { id } = useParams();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [En_num, setEn_num] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/getUser/" + id)
      .then((result) => {
        console.log(result);
        setName(result.data.name);
        setEmail(result.data.email);
        setEn_num(result.data.En_num);
        setPassword(result.data.password);
      })
      .catch((err) => console.log(err));
  }, []);

  const update = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3001/updateUser/" + id, {
        name: name,
        email: email,
        En_num: En_num,
        password: password,
      })
      .then((result) => {
        console.log(result);
        navigate("/allUsers");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex vh-100 bg-info justify-content-center align-items-center">
      <div className="w-75 bg-white rounded p-3">
        <form onSubmit={update}>
          <h2>Update User</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={name}
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
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">En_num</label>
            <input
              type="text"
              placeholder="Enter Age"
              className="form-control"
              value={En_num}
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
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-success">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
