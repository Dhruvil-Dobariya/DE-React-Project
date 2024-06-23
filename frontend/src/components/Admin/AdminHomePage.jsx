import { Link } from "react-router-dom";
import "../../Styles/FacultyHomePage.css"; // Ensure the CSS file path is correct

const AdminHomePage = () => {
  return (
    <div className="faculty-home-container">
      <h3>Admin HomePage</h3>

      <div className="buttons-container">
        <Link to="/createFac" className="btn">
          Add Faculty
        </Link>
        <Link to="/createUser" className="btn">
          Add Students
        </Link>
        <Link to="/allUsers" className="btn">
          Show Students
        </Link>
        <Link to="/allFaculty" className="btn">
          Show Faculties
        </Link>
        <Link to="/StudentRecords" className="btn">
          Show Records
        </Link>
        <Link to="/login" className="btn">
          Logout
        </Link>
      </div>
    </div>
  );
};

export default AdminHomePage;
