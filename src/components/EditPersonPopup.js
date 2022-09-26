import React, {useState} from 'react';

export default function EditPersonPopup( props ) {

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

      const updateState = () => {
        const newState = props.data.map(obj => {
          if (obj.id === props.id) {
            return {id: props.id, employee_name: employee_name, employee_salary: employee_salary, employee_age: employee_age};
          }
          return obj;
        });
        return newState;
      };

    const editPerson = async (e) => {
        e.preventDefault();
        await fetch('https://dummy.restapiexample.com/api/v1/update/21', {
                method: 'PUT',
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
            }).then(data => {props.setData(updateState()); props.setEditPerson(null)})
    }
  return (
    <div id='editPersonPopup'>
        <h1>Edit person</h1>
        <form>
        <label>Name</label>
            <input type='text' name='employee_name' value={employee_name} onChange={handleChange}/>
            <label>Salary</label>
            <input type='text' name='employee_salary' value={employee_salary} onChange={handleChange}/>
            <label>Age</label>
            <input type='text' name='employee_age' value={employee_age} onChange={handleChange}/>
            <button type='submit' onClick={(e) => editPerson(e)}>Update</button>
            <button onClick={() => props.setEditPersonPopup(false)}>Cancel</button>
        </form>
    </div>
  )
}
