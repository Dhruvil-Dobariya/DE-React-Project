import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const StudentRecords = () => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjectData, setSubjectData] = useState([]);

  const location = useLocation();

  const En_num = location.state;

  const fetchData = (subject, En_num) => {
    axios
      .get(`http://localhost:3001/StoreData/${subject}`, {
        params: { En_num: En_num, subject: selectedSubject },
      })
      .then((response) => {
        setSubjectData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
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
      <select onChange={(e) => setSelectedSubject(e.target.value)}>
        <option value="">Select Subject</option>
        <option value="TOC">TOC</option>
        <option value="DE_2B">DE_2B</option>
        <option value="WP">WP</option>
        <option value="AJP">AJP</option>
        <option value="MPI">MPI</option>
        <option value="IOT">IOT</option>
        <option value="IPDC">IPDC</option>
      </select>

      {subjectData.length > 0 && (
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
