import QRCode from "react-qr-code";
import { Link, useLocation } from "react-router-dom";

const StudentHomePage = () => {
  const location = useLocation();
  const Num = location.state.En_num;

  return (
    <div>
      <h1>Student Page</h1>
      <p>Your Num : {Num}</p>
      <QRCode value={Num} size={250} />
      <br />
      <br />
      <button>
        <Link to="/StudentRecords" state={Num}>
          Show Records
        </Link>
      </button>
      <button>
        <Link to="/">Logout</Link>
      </button>
    </div>
  );
};
export default StudentHomePage;
