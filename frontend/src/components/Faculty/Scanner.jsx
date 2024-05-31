import React, { useState, useRef } from "react";
import QrScanner from "qr-scanner";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../Styles/Scanner.css";

export default function Scanner() {
  const location = useLocation();
  const navigate = useNavigate();
  const [qrResult, setQrResult] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [error, setError] = useState("");
  const [cameraOpen, setCameraOpen] = useState(false);
  const [confirmFinish, setConfirmFinish] = useState(false);
  const [scannedDataList, setScannedDataList] = useState([]);
  const scannerRef = useRef(null);

  const date = location.state.date;
  const subject = location.state.Subject;

  const ShowPopUp = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to submit?",
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

  const handleScan = async () => {
    const videoElement = document.getElementById("scanner-frame");
    if (!scannerRef.current) {
      scannerRef.current = new QrScanner(
        videoElement,
        (result) => {
          setQrResult(result.data);
          handleAdd(result.data);
        },
        {
          onDecodeError: (error) => {
            console.error("QR decode error:", error);
            setQrResult("QR code scanning failed");
          },
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );
    }

    try {
      await scannerRef.current.start();
      setIsScanning(true);
    } catch (error) {
      console.error("Error starting scanner:", error);
    }
  };

  const handleStop = async () => {
    if (scannerRef.current) {
      await scannerRef.current.stop();
      scannerRef.current = null;
      setIsScanning(false);
    }
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
    <div className="scanner-container">
      <h1>QR Code Scanner</h1>
      <div className="button-group">
        <button onClick={handleScan} disabled={isScanning}>
          {isScanning ? "Scanning..." : "Start"}
        </button>
        <button onClick={handleStop} disabled={!isScanning}>
          Stop
        </button>
        <button onClick={ShowPopUp}>Finish</button>
      </div>
      <div className="scanner-frame-container">
        <video
          id="scanner-frame"
          autoPlay
          muted
          className="scanner-frame"
        ></video>

        {scannedDataList.length > 0 && (
          <div className="scanned-data">
            <h3>Scanned Data:</h3>
            <ul>
              {scannedDataList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="link-container">
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    </div>
  );
}
