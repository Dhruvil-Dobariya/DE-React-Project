// import { useState } from "react";
// import { confirmAlert } from "react-confirm-alert";
// import "react-confirm-alert/src/react-confirm-alert.css";
// import BarcodeScannerComponent from "react-qr-barcode-scanner";
// import axios from "axios";
// import { Link, useLocation } from "react-router-dom";

// const Scanner = () => {
//   const location = useLocation();
//   const [loadingScan, setLoadingScan] = useState(false);
//   const [data, setData] = useState("");
//   const [error, setError] = useState("");
//   const [cameraOpen, setCameraOpen] = useState(false);
//   const [confirmFinish, setConfirmFinish] = useState(false);
//   const [scannedDataList, setScannedDataList] = useState([]);

//   const date = location.state.date;
//   const subject = location.state.Subject;

//   const ShowPopUp = () => {
//     confirmAlert({
//       title: "Confirm to submit",
//       message: "Are you sure to submit???",
//       buttons: [
//         {
//           label: "Yes",
//           onClick: () => confirmFinishAction(),
//         },
//         {
//           label: "No",
//           onClick: () => setConfirmFinish(false),
//         },
//       ],
//     });
//   };

//   const handleScanButtonClick = () => {
//     setCameraOpen(!cameraOpen);
//   };

//   const handleAdd = (scannedData) => {
//     axios
//       .post("http://localhost:3001/StoreData", {
//         data: scannedData,
//         subject: subject,
//         date,
//       })
//       .then((response) => {
//         console.log("Data added successfully:", response.data);
//         alert("Data added successfully:", response.data);
//         setScannedDataList((prevList) => [...prevList, response.data.data]);
//       })
//       .catch((error) => {
//         if (error.response && error.response.status === 400) {
//           console.error("Data already exists");
//           alert("Data already exists");
//         } else {
//           console.error("Error adding data:", error);
//           alert("Error adding data:", error);
//         }
//       });
//   };

//   const confirmFinishAction = () => {
//     setConfirmFinish(false);
//     setScannedDataList("");
//     axios
//       .post("http://localhost:3001/AddAbsent", {
//         subject,
//         date,
//       })
//       .then((response) => {
//         console.log(response.data.message);
//         alert(response.data.message);
//       })
//       .catch((error) => {
//         console.error("Error finishing scanner:", error);
//         alert("Error finishing scanner:", error);
//       });
//   };

//   return (
//     <div className="App">
//       <h1>QR Code Scanner</h1>
//       <div id="btn-container">
//         <button onClick={handleScanButtonClick}>
//           {cameraOpen ? "Stop Scanning" : "Scan QR Code / Barcode"}
//         </button>
//         <button onClick={ShowPopUp}>Finish</button>
//       </div>
//       <div id="camera-container">
//         {cameraOpen && (
//           <BarcodeScannerComponent
//             id="camera-view"
//             width={300}
//             height={300}
//             onUpdate={(err, result) => {
//               if (result) {
//                 setData(result.text);
//                 setError("");
//                 handleAdd(result.text);
//               } else {
//                 setData("Not Found");
//               }
//             }}
//           />
//         )}
//       </div>
//       <div className="data">
//         {loadingScan && <p>Loading...</p>}
//         {error && <p>Error: {error}</p>}
//       </div>
//       <div>{data === "" ? null : <p>Data: {data}</p>}</div>

//       {scannedDataList.length > 0 && (
//         <div>
//           <h3>Scanned Data:</h3>
//           <ul>
//             {scannedDataList.map((item, index) => (
//               <li key={index}>{item}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//       <div>
//         <button>
//           <Link to="/ShowRecords" state={subject}>
//             Show Records
//           </Link>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Scanner;

import React, { useState } from "react";
import QrReader from "react-qr-reader";

const Scanner = () => {
  const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [qrFile, setQrFile] = useState(null);

  const handleScan = async (scanData) => {
    setLoadingScan(true);
    setError("");

    if (scanData && scanData !== "") {
      setData(scanData);
      setStartScan(false);
      setLoadingScan(false);
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError(
      "Error accessing the camera. Please make sure the camera is accessible."
    );
    setLoadingScan(false);
  };

  const handleBrowseButtonClick = () => {
    document.getElementById("qrFileInput").click();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setQrFile(file);
      scanQRFromFile(file);
    }
  };

  const scanQRFromFile = (file) => {
    setLoadingScan(true);
    setError("");

    const reader = new FileReader();
    reader.onload = async (event) => {
      const qrData = event.target.result;

      try {
        const result = await scanQRCodeFromData(qrData);
        if (result) {
          setData(result);
        } else {
          setError("No QR code or barcode found in the selected image.");
        }
      } catch (err) {
        setError("Error scanning QR code or barcode: " + err.message);
      }

      setLoadingScan(false);
    };

    reader.readAsDataURL(file);
  };

  const scanQRCodeFromData = (qrData) => {
    return new Promise((resolve, reject) => {
      // Simulate scanning of the QR code (replace with actual scanning library)
      setTimeout(() => {
        resolve(qrData);
      }, 2000);
    });
  };

  return (
    <div className="App">
      <h1>Item 1:</h1>

      <button
        onClick={() => {
          setStartScan(!startScan);
          setData("");
          setError("");
        }}
      >
        {startScan ? "Stop Scanning" : "Scan QR Code / Barcode"}
      </button>

      <button onClick={handleBrowseButtonClick}>
        Browse QR Code / Barcode
      </button>

      {startScan && (
        <QrReader
          delay={1000}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%" }}
        />
      )}

      {loadingScan && <p>Loading...</p>}

      {data && (
        <div>
          <p>Data:</p>
          <p>{data}</p>
        </div>
      )}

      {error && <p>Error: {error}</p>}

      <input
        type="file"
        id="qrFileInput"
        accept="image/*"
        onChange={handleFileInputChange}
        style={{ display: "none" }}
      />

      {qrFile && (
        <div>
          <p>Selected Image:</p>
          <img src={URL.createObjectURL(qrFile)} alt="Selected Image" />
        </div>
      )}
    </div>
  );
};

export default Scanner;
