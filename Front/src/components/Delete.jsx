import React from 'react'
import axios from 'axios'
import { Link, useParams,useNavigate } from 'react-router-dom'
import Header from './Header';

function Delete() {
  const {id} = useParams();
  const navigate = useNavigate();
  const handleClick = async (e)=>{
    e.preventDefault();
    try {
      await axios.delete("http://localhost:5000/delete/"+id)
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='container'>
      <div class="alert alert-danger w-50 m-auto my-5 " role="alert">
        
          <strong>Attention !</strong> ceci sera supprimé définitivement<br />
          Voulez-vous supprimer cette formation? 
          <br />
          
          <input type="button" onClick={handleClick} value="Oui" className='btn btn-danger mt-3'/>
          <Link to={"/"} className='btn btn-success mx-2 mt-3'>Non</Link>
          
      </div>
  
      
    </div>
  )
}

export default Delete