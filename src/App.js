import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import NewPersonPopup from "./components/NewPersonPopup";
import EditPersonPopup from "./components/EditPersonPopup";
import io from "socket.io-client";

function App() {
  const [data, _setData] = useState([]);
  const [createPersonPopup, setCreatePersonPopup] = useState(false);
  const [editPerson, setEditPerson] = useState(null);
  const [socket, setCurrentSocket] = useState(null);
  const [user, setUser] = useState({name: null, user_id: null});

  const dataRef = useRef(data);
  const setData = (data) => {
    dataRef.current = data;
    _setData(data);
  };

  /*    SOCKET.IO    */
  useEffect(() => {
    const socket = io("http://localhost:8080");
    setCurrentSocket(socket);

    socket.on(
      "new_message",
      (id, employee_name, employee_age, employee_salary) => {
        setData((data) => [
          ...data,
          {
            id: id,
            employee_name: employee_name,
            employee_age: employee_age,
            employee_salary: employee_salary,
          },
        ]);
      }
    );
    socket.on(
      "update_message",
      (id, employee_name, employee_age, employee_salary) => {
        const newState = dataRef.current.map((obj) => {
          if (obj.id === id) {
            return {
              id: id,
              employee_name: employee_name,
              employee_age: employee_age,
              employee_salary: employee_salary,
            };
          }
          return obj;
        });
        setData(newState);
      }
    );
    socket.on("delete_message", (id) => {
      setData(dataRef.current.filter((element) => element.id !== id));
    });

    return () => socket.close();
  }, []);

  /*    GET initial data on page load    */
  useEffect(() => {
    const getData = async () => {
      try {
        return await fetch("http://localhost:8080", { method: "GET" })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setData(data.data);
            localStorage.setItem("data", JSON.stringify(data.data));
          });
      } catch (error) {
        console.log(error);
        setData(JSON.parse(localStorage.getItem("data")));
      }
    };
    getData();
  }, []);

  const newUser = () => {
    setCreatePersonPopup(true);
    setEditPerson(null);
  };

  const editUser = (id) => {
    setEditPerson(
      <EditPersonPopup
        setData={setData}
        data={data}
        id={id}
        setEditPerson={setEditPerson}
        socket={socket}
      />
    );
    setCreatePersonPopup(false);
  };

  const deleteUser = async (id) => {
    await fetch(`http://localhost:8080/${id}`, { method: "DELETE" })
      .then((res) => {
        return res.json();
      })
      .then((df) => {
        setData(data.filter((element) => element.id !== id));
      }, socket.emit("delete_message", id));
    setCreatePersonPopup(false);
    setEditPerson(null);
  };

  const login = async (user, user_id) => {
    await fetch(`http://localhost:8080/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({
        name: user,
        user_id: user_id,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUser({name: data.user.name, user_id: data.user.user_id});
      });
  };

  const logout = async () => {
    await fetch(`http://localhost:8080/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
    })
      .then((res) => {
        setUser({name: null, user_id: null});
      })
  }

  return (
    <>
      <div>
        <button onClick={() => login("Jack", 1)}>Jack</button>
        <button onClick={() => login("John", 2)}>John</button>
        <button onClick={() => logout(null)}>Logout</button>
      </div>
      <p>User {user.name}</p>
      {createPersonPopup ? (
        <NewPersonPopup
          setCreatePersonPopup={setCreatePersonPopup}
          setData={setData}
          data={data}
          socket={socket}
          owner_id={user}
        />
      ) : null}
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
          {data &&
            data.map((row, i) => (
              <tr key={i} id={row.id}>
                <td>{row.id}</td>
                <td>{row.employee_name}</td>
                <td>{row.employee_salary}</td>
                <td>{row.employee_age}</td>
                <td>
                  <button onClick={() => editUser(row.id)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => deleteUser(row.id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <button onClick={() => newUser()}>Create new</button>
    </>
  );
}

export default App;
