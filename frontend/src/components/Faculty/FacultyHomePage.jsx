import { Link, useLocation } from "react-router-dom";
import "../../Styles/FacultyHomePage.css";

const FacultyHomePage = () => {
  var today = new Date();
  var date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  const location = useLocation();
  const Subject = location.state.subject;
  const Email = location.state.email;

  return (
    <div className="faculty-home-container">
      <h3>Faculty HomePage</h3>
      <div className="info">
        <p>Subject :- {Subject}</p>
        <p>Date :- {date}</p>
        <p>Email :- {Email}</p>
      </div>
      <div className="buttons-container">
        <Link to="/Scanner" state={{ Subject, date }} className="btn">
          Scan
        </Link>
        <Link to="/allUsers" className="btn">
          Show Students
        </Link>
        <Link to="/createUser" className="btn">
          Add Students
        </Link>
        <Link to="/ShowRecords" state={{ Subject, date }} className="btn">
          Show Records
        </Link>
        <Link to="/login" className="btn">
          Logout
        </Link>
      </div>
    </div>
  );
};

export default FacultyHomePage;
