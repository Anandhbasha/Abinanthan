import axios from 'axios';
import React, { useEffect, useState } from 'react';

const App = () => {
  const [datas, setData] = useState([]);
  const [insert, setInsert] = useState({
    userName: "",
    Password: "",
    Mobile: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:6004/crud');
        if (!res) {
          throw Error("Unable to connect");
        }
        setData(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const addNewuser = (e) => {
    setInsert((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      const insertuser = await axios.post('http://localhost:6004/crud/insert/', insert);
      if (!insertuser) {
        throw Error("Unable to add user");
      }
      alert("Added Successfully");
    } catch (error) {
      alert(error);
    }
  };

  const handleRowChange = (e, index) => {
    const { name, value } = e.target;
    const updatedData = [...datas];
    updatedData[index][name] = value;
    setData(updatedData);
  };

  const editInfo = async (mobile, newUserName) => {
    try {
      const edit = await axios.put(`http://localhost:6004/crud/${mobile}`, {
        userName: newUserName
      });
      if (!edit) {
        throw Error("Unable to edit");
      }
      alert("User Updated Successfully");
    } catch (error) {
      alert(error);
    }
  };

  const deleteInfo = async (userName) => {
    try {
      const deleteInfor = await axios.delete(`http://localhost:6004/crud/${userName}`);
      if (!deleteInfor) {
        throw Error("Unable to delete");
      }
      alert(`${userName} user Deleted Successfully`);
      setData(datas.filter(item => item.userName !== userName));
    } catch (error) {
      alert(error);
    }
  };

  console.log(datas);

  return (
    <div className='Adduser'>
      <div className='show'>
        {datas.length === 0 ? "There is No data" : datas.map((x, index) => (
          <form key={index} className='data'>
            <input
              type='text'
              name='userName'
              value={x.userName}
              onChange={(e) => handleRowChange(e, index)}
            />
            <input
              type='number'
              name='Mobile'
              value={x.Mobile}
              onChange={(e) => handleRowChange(e, index)}
            />
            <button type="submit" onClick={() => editInfo(x.Mobile, x.userName)}>Edit</button>
            <button type="submit" onClick={() => deleteInfo(x.userName)}>{x.userName}Delete</button>
          </form>
        ))}
      </div>
      <h3>Add New User</h3>
      <form>
        UserName:
      <input
        type='text'
        name="userName"
        onChange={addNewuser}
        placeholder='Enter your userName'
        value={insert.userName}
      />
      Password:
      <input
        type='password'
        name='Password'
        onChange={addNewuser}
        placeholder='Enter your password'
        value={insert.Password}
      />
      Mobile:
      <input
        type='number'
        name='Mobile'
        onChange={addNewuser}
        placeholder='Enter your Mobile'
        value={insert.Mobile}
      />
      <button type="submit" onClick={(e)=>handleSubmit(e)}>Add User</button>
      </form>
    </div>
  );
};

export default App;
