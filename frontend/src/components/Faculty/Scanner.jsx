import { useState } from "react";
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
        subject: subject,
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

  const handleFinish = () => {
    // Make a POST request to your server endpoint for finishing scanning
    axios
      .post("/api/finishScanner", { subject, date })
      .then((response) => {
        console.log(response.data.message); // Assuming your server sends a message upon successful update
        // Handle any UI updates or notifications here
      })
      .catch((error) => {
        console.error("Error finishing scanner:", error);
        // Handle any error scenarios
      });
  };
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
      <button onClick={handleFinish}>Finish</button>
    </div>
  );
};

export default Scanner;
