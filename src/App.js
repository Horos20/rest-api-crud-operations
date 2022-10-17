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
      return await fetch('https://dummy.restapiexample.com/api/v1/employees', {method: 'GET'}
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
  setEditPerson(<EditPersonPopup setData={setData} data={data} id={id} setEditPerson={setEditPerson}/>);
  setCreatePersonPopup(false);
}

const deleteUser = async (id) => {
  await fetch(`https://dummy.restapiexample.com/api/v1/delete/2`, {method: 'DELETE'}
  ).then (res => {
    return res.text()
  }).then (df => {
    setData(data.filter(element => element.id !== id))
  })
  setCreatePersonPopup(false);
  setEditPerson(null);
}

  return (
    <>
    {createPersonPopup ? <NewPersonPopup setCreatePersonPopup={setCreatePersonPopup} setData={setData} data={data}/> : null}
    {editPerson}
    <table>
      <tbody>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Salary</th>
        <th>Age</th>
        <th></th>
      </tr>
      {data && data.map((row, i) => (
          <tr key={i} id={row.id}>
            <td>{row.id}</td>
            <td>{row.employee_name}</td>
            <td>{row.employee_salary}</td>
            <td>{row.employee_age}</td>
            <td><button onClick={() => editUser(row.id)}>Edit</button></td>
            <td><button onClick={() => deleteUser(row.id)}>Delete</button></td>
          </tr>
        ))}
        </tbody>
      </table>
      <button onClick={() => newUser()}>Create new</button>
      </>
  );
}

export default App;
