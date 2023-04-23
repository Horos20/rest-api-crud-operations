import React, { useState, useEffect } from 'react'

export default function Logs() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getLogs = async () => {
      return await fetch("http://localhost:8080/logs", { method: "GET" })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              setData(data)
            });
    }
    getLogs();
  }, []);
  return (
    <div>
      <h1>Logs</h1>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Event</th>
            <th>User</th>
            <th>Changes</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.timestamp}>
              <td>{item.timestamp}</td>
              <td>{item.eventName}</td>
              <td>{item.userName}</td>
              <td>{item.extraData}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
