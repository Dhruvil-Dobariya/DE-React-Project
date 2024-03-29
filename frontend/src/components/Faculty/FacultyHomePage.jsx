import { Link, useLocation } from "react-router-dom";

const FacultyHomePage = () => {
  var today = new Date();
  var date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  const location = useLocation();
  const Subject = location.state.subject;
  const Email = location.state.email;

  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center vh-100">
      <h3>FacultyHomePage </h3>
      Your Subject : {Subject} <br />
      Date : {date} <br />
      Email : {Email}
      <br />
      <button className="btn btn-light mb-2 ">
        <Link to="/Scanner" state={{ Subject, date }}>
          Scan
        </Link>
      </button>
      <button className="btn btn-light mb-2">
        <Link to="/allUsers">Show Students</Link>
      </button>
      <button className="btn btn-light mb-2">
        <Link to="/createUser">Add Students</Link>
      </button>
      <button className="btn btn-light mb-2">
        <Link to="/ShowRecords" state={{ Subject, date }}>
          Show Records
        </Link>
      </button>
      <button className="btn btn-light mb-2">
        <Link to="/login">Logout</Link>
      </button>
    </div>
  );
};

export default FacultyHomePage;
