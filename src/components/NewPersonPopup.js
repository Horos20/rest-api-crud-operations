import React, {useState} from 'react';

export default function NewPersonPopup( props ) {

    const [formValue, setFormValue] = useState({
        employee_name: "",
        employee_salary: "",
        employee_age: "",
      });
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValue((prevState) => {
          return {
            ...prevState,
            [name]: value,
          };
        });
      };
    
      const { employee_name, employee_salary, employee_age } = formValue;

    const createNewPerson = async (e) => {
        e.preventDefault();
        await fetch('http://localhost:8080', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    employee_name: employee_name,
                    employee_salary: employee_salary,
                    employee_age: employee_age,
                    owner_id: props.owner_id
                })
            }).then(res => {
                return res.json()
            }).then(data => {props.setData(props.data.concat(data.data[0])); props.setCreatePersonPopup(false); props.socket.emit("new_message", data.data[0].id , employee_name, employee_age, employee_salary)})
    }
  return (
    <div id='newPersonPopup'>
        <h1>New person</h1>
        <form>
        <label>Name</label>
            <input type='text' name='employee_name' value={employee_name} onChange={handleChange}/>
            <label>Salary</label>
            <input type='text' name='employee_salary' value={employee_salary} onChange={handleChange}/>
            <label>Age</label>
            <input type='text' name='employee_age' value={employee_age} onChange={handleChange}/>
            <button type='submit' onClick={(e) => createNewPerson(e)}>Save</button>
            <button onClick={() => props.setCreatePersonPopup(false)}>Cancel</button>
        </form>
    </div>
  )
}
