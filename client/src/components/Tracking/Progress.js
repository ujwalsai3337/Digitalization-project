import React, { useState, useEffect } from "react";
import LineChart from "./LineChart";

function Progress({ project }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (project) {
      let sum = 0;
      const newData = {
        labels: project.progress.map((data, index) => index),
        datasets: [
          {
            label: "Progress",
            data: project.progress.map((data) => {
              sum += data.direction + data.resource_utilization + data.satisfaction;
              return sum;
            }),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      };
      setUserData(newData);
    }
  }, [project]);

  return (
    <div className="Progress">
      {userData && (
        <div style={{ width: 700 }}>
          <LineChart chartData={userData} />
        </div>
      )}
    </div>
  );
}

export default Progress;
