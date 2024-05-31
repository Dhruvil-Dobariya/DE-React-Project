import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../../Styles/StudentRecords.css";
import { FaSort } from "react-icons/fa";

const StudentRecords = () => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjectData, setSubjectData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "ascending",
  });

  const location = useLocation();
  const En_num = location.state;

  const fetchData = (subject, En_num) => {
    setLoading(true);
    setError("");
    setSubjectData([]);

    axios
      .get(`http://localhost:3001/StoreData/${subject}`, {
        params: { En_num: En_num, subject: selectedSubject },
      })
      .then((response) => {
        if (response.data.length === 0) {
          setError("No data found");
        } else {
          setSubjectData(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (selectedSubject && En_num) {
      fetchData(selectedSubject, En_num);
    }
  }, [selectedSubject, En_num]);

  const sortedData = [...subjectData];
  if (sortConfig.key !== null) {
    sortedData.sort((a, b) => {
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
    <div className="student-records-container">
      <h1>Student Records</h1>
      <hr />
      <select
        onChange={(e) => setSelectedSubject(e.target.value)}
        value={selectedSubject}
      >
        <option value="">Subject</option>
        <option value="TOC">TOC</option>
        <option value="DE_2B">DE_2B</option>
        <option value="WP">WP</option>
        <option value="AJP">AJP</option>
        <option value="MPI">MPI</option>
        <option value="IOT">IOT</option>
        <option value="IPDC">IPDC</option>
      </select>

      {loading && <p>Loading...</p>}

      {!loading && selectedSubject && error && <p>{error}</p>}

      {!loading && sortedData.length > 0 && (
        <div className="table-container">
          <h2>Data for {selectedSubject}</h2>
          <table className="records-table">
            <thead>
              <tr>
                <th onClick={() => requestSort("data")}>
                  En Num <FaSort />
                </th>
                <th onClick={() => requestSort("date")}>
                  Date <FaSort />
                </th>
                <th onClick={() => requestSort("subject")}>
                  Subject <FaSort />
                </th>
                <th onClick={() => requestSort("status")}>
                  Status <FaSort />
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((data, index) => (
                <tr key={index}>
                  <td data-label="En Num">{data.data}</td>
                  <td data-label="Date">{data.date}</td>
                  <td data-label="Subject">{data.subject}</td>
                  <td data-label="Status">
                    {data.status ? "Present" : "Absent"}
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

export default StudentRecords;
