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
        await fetch('https://dummy.restapiexample.com/api/v1/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    employee_name: employee_name,
                    employee_salary: employee_salary,
                    employee_age: employee_age
                })
            }).then(res => {
                return res.json()
            }).then(data => {props.setData(prev => [...prev, data.data]); props.setCreatePersonPopup(false)})
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
