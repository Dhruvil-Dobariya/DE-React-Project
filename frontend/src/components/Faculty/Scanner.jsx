import { useEffect, useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Scanner = () => {
  const location = useLocation();
  const [loadingScan, setLoadingScan] = useState(false);
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [cameraOpen, setCameraOpen] = useState(false);
  const [scannedDataHistory, setScannedDataHistory] = useState(new Set());

  const date = location.state.date;
  const subject = location.state.Subject;

  const handleError = (err) => {
    console.error(err);
    setError(
      "Error accessing the camera. Please make sure the camera is accessible."
    );
    setLoadingScan(false);
  };

  const handleScanButtonClick = () => {
    setCameraOpen(!cameraOpen);
  };

  const handleAdd = () => {
    axios
      .post("http://localhost:3001/StoreData", {
        data: [...scannedDataHistory],
        subject,
        date,
      })
      .then((response) => {
        console.log("Data added successfully:", response.data);
        alert("Data added successfully:", response.data);
        setScannedDataHistory(new Set());
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          console.error("Data already exists");
          alert("Data already exists");
        } else {
          console.error("Error adding data:", error);
          alert("Error adding data:", error);
        }
      });
  };

  const [scannedData, setScannedData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/getData")
      .then((response) => {
        setScannedData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="App">
      <h1>QR Code Scanner</h1>
      <div id="btn-container">
        <button onClick={handleScanButtonClick}>
          {cameraOpen ? "Stop Scanning" : "Scan QR Code / Barcode"}
        </button>
      </div>
      <div id="camera-container">
        {cameraOpen && (
          <BarcodeScannerComponent
            id="camera-view"
            width={300}
            height={300}
            onUpdate={(err, result) => {
              if (result) {
                if (!scannedDataHistory.has(result.text)) {
                  setData(result.text);
                  setScannedDataHistory(
                    (prevData) => new Set([...prevData, result.text])
                  );
                  setError("");
                } else {
                  setError("QR Code already scanned");
                }
              } else {
                setData("Not Found");
              }
            }}
          />
        )}
      </div>

      <div className="data">
        {loadingScan && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
      </div>
      <div>
        {data === "" ? null : <p>Data: {data}</p>}
        <ul>
          {[...scannedDataHistory].map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <button onClick={handleAdd}>Add</button>
      <div>
        <p>final data</p>
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Subject</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {scannedData.map((item) => (
              <tr key={item._id}>
                <td>{item.data}</td>
                <td>{item.subject}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Scanner;
