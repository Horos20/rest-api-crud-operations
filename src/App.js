import './App.css';
import React, { useState, useEffect } from 'react';
import NewPersonPopup from './components/NewPersonPopup';
import EditPersonPopup from './components/EditPersonPopup';

function App() {

  const [data, setData] = useState([]);
  const [createPersonPopup, setCreatePersonPopup] = useState(false);
  const [editPerson, setEditPerson] = useState(null);

  /*    GET initial data on page load    */
  useEffect(() => {
    const getData = async () => {
      return await fetch('https://reqres.in/api/users?page=2', {method: 'GET'}
    ).then (res => {
        return res.json()
    }).then (data => {
      setData(data.data)
    })}
    getData();
}, []);

const newUser = () => {
  setCreatePersonPopup(true);
  setEditPerson(null);
}

const editUser = (id) => {
  setEditPerson(<EditPersonPopup setData={setData} data={data} id={id}/>);
  setCreatePersonPopup(false);
}

  return (
    <>
    {createPersonPopup ? <NewPersonPopup setCreatePersonPopup={setCreatePersonPopup} setData={setData} data={data}/> : null}
    {editPerson}
    <table>
      <tbody>
      <tr>
        <th>Id</th>
        <th>Email</th>
        <th>First name</th>
        <th>Last name</th>
        <th></th>
      </tr>
      {data && data.map((row, i) => (
          <tr key={i}>
            <td>{row.id}</td>
            <td>{row.email}</td>
            <td>{row.first_name}</td>
            <td>{row.last_name}</td>
            <td><button onClick={() => editUser(row.id)}>Edit</button></td>
          </tr>
        ))}
        </tbody>
      </table>
      <button onClick={() => newUser()}>Create new</button>
      </>
  );
}

export default App;
