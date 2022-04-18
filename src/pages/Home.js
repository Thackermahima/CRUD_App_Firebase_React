import React,{useState, useEffect} from 'react'
import fireDb from '../firebase'
import { Link } from 'react-router-dom';
import "./Home.css";
import { toast } from 'react-toastify';
const Home = () => {
  const [data, setData] = useState({});

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
  }, []);

  const onDelete = (id) => {
    if(
      window.confirm("Are you sure that you wanted to delete that contact ?")
    ){
      fireDb.child(`contacts/${id}`).remove((err) =>{
        if(err){
          toast.error(err);
        } else {
          toast.success("Contact Deleted Successfully")
        }
      })
    }
  }
  return (
 <div style={{ marginTop:"100px"}}>
   <table style={{
     margin:'auto',
     paddingTop:'80px',
   }}
   className='styledTable'>
     <thead>
       <tr>
       <th>No.</th>
       <th >Name</th>
       <th>Email</th>
       <th>Contact</th>
       <th>Action</th>
       </tr>
     </thead>
     <tbody>
       {Object.keys(data).map((id, index) => {
        
         return (
           <tr key = {id}>
             <th scope="row">{index + 1}</th>
             <td>{ data[id].name}</td>
             <td>{ data[id].email}</td>
             <td>{ data[id].contact}</td>
            <td>
              <Link to={`/update/${id}`}>
                <button className='btn btnEdit'>Edit</button>
              </Link>
                <button className='btn btnDelete' onClick={ ()=> onDelete(id)}>Delete</button>
              <Link to={`/view/${id}`}>
                <button className='btn btnView'>View</button>
              </Link>
            </td>
           </tr>
         )
         })}
     </tbody>
   </table>

 </div>
    )
}

export default Home