import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ShowRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const subject = location.state.Subject;
  const date = location.state.date;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/ShowRecords", {
          params: {
            subject: subject,
          },
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

  return (
    <div>
      <h1>Show Records</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {records.map((record, index) => (
            <li key={index}>
              En Num: {record.data}, Subject: {record.subject}, Date:
              {record.date}, {record.status ? "Present" : "Absent"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShowRecords;
