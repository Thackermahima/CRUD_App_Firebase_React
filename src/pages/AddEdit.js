import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './AddEdit.css';
import fireDb from '../firebase';
import { toast } from 'react-toastify';
const initialState = {
  name: "",
  email: "",
  contact: ""
}
const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});
  const { name, email, contact } = state;
  const history = useNavigate();
  const {id} = useParams();

  useEffect(()=> {
    fireDb.child('contacts').on('value', (snapshot) => {
      if( snapshot.val() !== null){
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });

    return () => {
      setData({});
    }
  }, [id]);

  useEffect(()=> {
    if(id) {
      setState({ ...data[id]});
    } else {
      setState({ ...initialState})
    }
return () => {
  setState({ ...initialState });
};
  }, [id, data])
  const handleInputChange = (e) => {
    const {name, value } = e.target
    setState({ ...state, [name]:value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      toast.error("Please provide value in each input field");
    } else {
      if(!id){
      fireDb.child("contacts").push(state, (err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Contact Added Successfully");
        }
      });
    } else {
      fireDb.child(`contacts/${id}`).set(state, (err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Contact Updated Successfully");
        }
      });
    }
history("/")
    }
  };

  
  return (

    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center"
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor='name'>Name</label>
        <input
          type="text"
          id="name"
          name='name'
          value={name || ""}
          placeholder='Enter your Name'
          onChange={(e) => handleInputChange(e)} />
        <label htmlFor='email'>Email</label>
        <input
          type="email"
          id="email"
          name='email'
          value={email || ""}
          placeholder='Enter your email'
          onChange={(e) => handleInputChange(e)} />
        <label htmlFor='contact'>Contact</label>
        <input
          type="number"
          id="contact"
          name='contact'
          value={contact || ""}
          placeholder='Enter your Contact'
          onChange={(e) => handleInputChange(e)} />
        <input type="submit" value={id ? "Update" : "Save"} />
      </form>
    </div>)
}

export default AddEdit