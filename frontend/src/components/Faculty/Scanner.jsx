import { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Scanner = () => {
  const location = useLocation();
  const [loadingScan, setLoadingScan] = useState(false);
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [cameraOpen, setCameraOpen] = useState(false);
  const [confirmFinish, setConfirmFinish] = useState(false);
  const [scannedDataList, setScannedDataList] = useState([]);

  const date = location.state.date;
  const subject = location.state.Subject;

  const ShowPopUp = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to submit???",
      buttons: [
        {
          label: "Yes",
          onClick: () => confirmFinishAction(),
        },
        {
          label: "No",
          onClick: () => setConfirmFinish(false),
        },
      ],
    });
  };

  const handleScanButtonClick = () => {
    setCameraOpen(!cameraOpen);
  };

  const handleAdd = (scannedData) => {
    axios
      .post("http://localhost:3001/StoreData", {
        data: scannedData,
        subject: subject,
        date,
      })
      .then((response) => {
        console.log("Data added successfully:", response.data);
        alert("Data added successfully:", response.data);
        setScannedDataList((prevList) => [...prevList, response.data.data]);
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

  const confirmFinishAction = () => {
    setConfirmFinish(false);
    setScannedDataList("");
    axios
      .post("http://localhost:3001/AddAbsent", {
        subject,
        date,
      })
      .then((response) => {
        console.log(response.data.message);
        alert(response.data.message);
      })
      .catch((error) => {
        console.error("Error finishing scanner:", error);
        alert("Error finishing scanner:", error);
      });
  };

  return (
    <div className="App">
      <h1>QR Code Scanner</h1>
      <div id="btn-container">
        <button onClick={handleScanButtonClick}>
          {cameraOpen ? "Stop Scanning" : "Scan QR Code / Barcode"}
        </button>
        <button onClick={ShowPopUp}>Finish</button>
      </div>
      <div id="camera-container">
        {cameraOpen && (
          <BarcodeScannerComponent
            id="camera-view"
            width={300}
            height={300}
            onUpdate={(err, result) => {
              if (result) {
                setData(result.text);
                setError("");
                handleAdd(result.text);
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
      <div>{data === "" ? null : <p>Data: {data}</p>}</div>

      {scannedDataList.length > 0 && (
        <div>
          <h3>Scanned Data:</h3>
          <ul>
            {scannedDataList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Scanner;
