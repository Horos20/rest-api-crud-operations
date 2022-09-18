import './App.css';
import React, { useState, useEffect } from 'react';

function App() {

  const [data, setData] = useState([]);

  /*    GET initial data on page load    */
  useEffect(() => {
    const getData = async () => {
      return await fetch('https://reqres.in/api/users?page=2', {method: 'GET'}
    ).then (res => {
        return res.json()
    }).then (data => {
      setData(data)
    })}
    getData();
}, []);

  return (
    <>
    <table>
      <thead></thead>
      <tbody>
      <tr>
        <th>Id</th>
        <th>Email</th>
        <th>First name</th>
        <th>Last name</th>
      </tr>
      {data.data && data.data.map((row, i) => (
          <tr key={i}>
            <td>{row.id}</td>
            <td>{row.email}</td>
            <td>{row.first_name}</td>
            <td>{row.last_name}</td>
          </tr>
        ))}
        </tbody>
      </table>
      </>
  );
}

export default App;
