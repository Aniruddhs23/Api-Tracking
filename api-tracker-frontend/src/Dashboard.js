import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [browserData, setBrowserData] = useState({});
  const [criteriaData, setCriteriaData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/hits", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setData(response.data);

      const browsers = response.data.reduce((acc, hit) => {
        const browser = hit.user_agent.split(" ")[0];
        acc[browser] = acc[browser] ? acc[browser] + 1 : 1;
        return acc;
      }, {});

      setBrowserData({
        labels: Object.keys(browsers),
        datasets: [
          {
            data: Object.values(browsers),
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          },
        ],
      });

      const criteria = response.data.reduce((acc, hit) => {
        const criterion = hit.request_type;
        acc[criterion] = acc[criterion] ? acc[criterion] + 1 : 1;
        return acc;
      }, {});

      setCriteriaData({
        labels: Object.keys(criteria),
        datasets: [
          {
            data: Object.values(criteria),
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>API Hit Dashboard</h1>
      <div>
        <h2>Number of Requests by Browser</h2>
        <Pie data={browserData} />
      </div>
      <div>
        <h2>Number of Requests by Criteria</h2>
        <Bar data={criteriaData} />
      </div>
      <div>
        <h2>API Hit Table</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Request ID</th>
              <th>Request Type</th>
              <th>Request Time</th>
              <th>Payload</th>
              <th>Content Type</th>
              <th>IP Address</th>
              <th>OS</th>
              <th>User Agent</th>
            </tr>
          </thead>
          <tbody>
            {data.map((hit) => (
              <tr key={hit.id}>
                <td>{hit.id}</td>
                <td>{hit.request_id}</td>
                <td>{hit.request_type}</td>
                <td>{hit.request_time}</td>
                <td>{hit.payload}</td>
                <td>{hit.content_type}</td>
                <td>{hit.ip_address}</td>
                <td>{hit.os}</td>
                <td>{hit.user_agent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
