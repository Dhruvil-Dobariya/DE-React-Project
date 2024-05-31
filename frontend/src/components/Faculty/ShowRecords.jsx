import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../../Styles/Showrecords.css";
import { FaSort } from "react-icons/fa6";

const ShowRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "ascending",
  });

  const location = useLocation();
  const navigate = useNavigate();
  const subject = location.state.Subject;
  const date = location.state.date;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/ShowRecords", {
          params: { subject },
        });
        setRecords(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [subject]);

  const sortedRecords = [...records];

  if (sortConfig.key !== null) {
    sortedRecords.sort((a, b) => {
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

  return (
    <div className="show-records-container">
      <h1>Show Records</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="mobile-sort-button">
            <button onClick={() => navigate(-1)}>Back</button>
            <button onClick={() => requestSort("date")}>
              Sort by Date <FaSort />
            </button>
          </div>
          <div className="table-container">
            <table className="show-records-table">
              <thead>
                <tr>
                  <th onClick={() => requestSort("data")}>
                    En Num <FaSort />
                  </th>
                  <th onClick={() => requestSort("subject")}>
                    Subject <FaSort />
                  </th>
                  <th onClick={() => requestSort("date")}>
                    Date <FaSort />
                  </th>
                  <th onClick={() => requestSort("status")}>
                    Status <FaSort />
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedRecords.map((record, index) => (
                  <tr key={index}>
                    <td data-label="En Num">{record.data}</td>
                    <td data-label="Subject">{record.subject}</td>
                    <td data-label="Date">{record.date}</td>
                    <td data-label="Status">
                      {record.status ? "Present" : "Absent"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ShowRecords;
