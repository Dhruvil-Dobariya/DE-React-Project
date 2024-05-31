import QRCode from "react-qr-code";
import { Link, useLocation } from "react-router-dom";
import "../../Styles/StudentPage.css";

const StudentHomePage = () => {
  const location = useLocation();
  const Num = location.state.En_num;

  return (
    <>
      <div className="container">
        <div className="inner-container">
          <h1 className="heading">Student Page</h1>
          <h6 className="num">Your Num : {Num}</h6>
          <QRCode className="qr" value={Num} size={250} />
          <br />
          <br />
          <button>
            <Link className="btns" to="/StudentRecords" state={Num}>
              Show Records
            </Link>
          </button>
          <button>
            <Link className="btns" to="/">
              Logout
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};
export default StudentHomePage;
