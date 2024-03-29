import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center vh-100">
      <Link to="/allUsers" className="btn btn-light mb-2 ">
        Show Users
      </Link>
      <Link to="/createUser" className="btn btn-light mb-2 ">
        Add User
      </Link>
      <Link to="/FacultyHomePage" className="btn btn-light mb-2 ">
        Scan Now
      </Link>
      <Link to="/login" className="btn btn-light mb-2 ">
        Logout
      </Link>
    </div>
  );
};

export default Home;
