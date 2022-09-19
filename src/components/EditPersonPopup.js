import React, {useState} from 'react';

export default function EditPersonPopup( props ) {

    const [formValue, setFormValue] = useState({
        email: "",
        first_name: "",
        last_name: "",
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
    
      const { email, first_name, last_name } = formValue;

      const updateState = () => {
        const newState = props.data.map(obj => {
          if (obj.id === props.id) {
            return {id: props.id, email: email, first_name: first_name, last_name: last_name};
          }
          return obj;
        });
        return newState;
      };

    const editPerson = async (e) => {
        e.preventDefault();
        await fetch('https://reqres.in/api/users/2', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    first_name: first_name,
                    last_name: last_name
                })
            }).then(res => {
                return res.json()
            }).then(data => {props.setData(updateState())})
    }
  return (
    <div id='editPersonPopup'>
        <h1>Edit person</h1>
        <form>
            <label>First name</label>
            <input type='text' name='first_name' value={first_name} onChange={handleChange}/>
            <label>Last name</label>
            <input type='text' name='last_name' value={last_name} onChange={handleChange}/>
            <label>Email</label>
            <input type='text' name='email' value={email} onChange={handleChange}/>
            <button type='submit' onClick={(e) => editPerson(e)}>Update</button>
            <button onClick={() => props.setEditPersonPopup(false)}>Cancel</button>
        </form>
    </div>
  )
}
