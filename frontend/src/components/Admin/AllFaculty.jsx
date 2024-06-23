import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSort } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { MdOutlineDeleteForever } from "react-icons/md";
import "../../Styles/AllStudents.css";

const AllFaculty = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:3001/AllFaculty");
        setUsers(result.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const sortedUsers = [...users];

  if (sortConfig.key !== null) {
    sortedUsers.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete("http://localhost:3001/deleteFaculty/" + id)
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="show-records-container">
      <h1>All Students</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="table-container">
          <div className="top-button">
            <button className="back" onClick={() => navigate(-1)}>
              Back
            </button>
            <button className="add" onClick={() => navigate("/createUser")}>
              Add
            </button>
          </div>
          <table className="show-records-table">
            <thead>
              <tr>
                <th onClick={() => requestSort("name")}>
                  Name <FaSort />
                </th>
                <th onClick={() => requestSort("email")}>
                  Email <FaSort />
                </th>
                <th onClick={() => requestSort("subject")}>
                  Subject <FaSort />
                </th>

                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user, index) => (
                <tr key={index}>
                  <td data-label="Name">{user.name}</td>
                  <td data-label="Email">{user.email}</td>
                  <td data-label="En. Number">{user.subject}</td>
                  <td data-label="Action">
                    <div className="buttons">
                      <button className="update-btn update">
                        <Link to={`/updateFaculty/${user._id}`}>
                          <GrUpdate />
                        </Link>
                      </button>

                      <button
                        className="delete-btn delete"
                        onClick={() => handleDelete(user._id)}
                      >
                        <MdOutlineDeleteForever className="delete-icon" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllFaculty;
