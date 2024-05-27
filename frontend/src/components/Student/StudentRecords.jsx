import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const StudentRecords = () => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjectData, setSubjectData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const location = useLocation();
  const En_num = location.state;

  const fetchData = (subject, En_num) => {
    setLoading(true);
    setError("");
    setSubjectData([]); // Clear previous data

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

  return (
    <div>
      <h1>Student Page</h1>
      <hr />
      <select onChange={(e) => setSelectedSubject(e.target.value)} value={selectedSubject}>
        <option value="">Select Subject</option>
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

      {!loading && subjectData.length > 0 && (
        <div>
          <h2>Data for {selectedSubject}</h2>
          {subjectData.map((data, index) => (
            <ul key={index}>
              <li>En_num: {data.data}</li>
              <li>Date: {data.date}</li>
              <li>Subject: {data.subject}</li>
              <li>Status: {data.status ? "Present" : "Absent"}</li>
            </ul>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentRecords;
