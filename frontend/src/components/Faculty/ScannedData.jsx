import React from "react";

const ScannedData = ({ data }) => {
  return (
    <div>
      <h2>Scanned Data:</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ScannedData;
