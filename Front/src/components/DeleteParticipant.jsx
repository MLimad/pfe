import React from 'react'
import Header from './Header'
import axios from 'axios'
import { Link, useParams,useNavigate } from 'react-router-dom'


function DeleteParticipant() {
    const {id} = useParams();
    const navigate = useNavigate();
    const handleClick = async (e)=>{
        
        e.preventDefault();
        try {
          await axios.delete("http://localhost:5000/deleteParticipant/"+id)
          navigate(-1);
        } catch (error) {
          console.log(error);
        }
      }

      const handleButtonNon = (e) =>{
        e.preventDefault();
        navigate(-1);
      }
  return (
    <div className='container'>
        <div class="alert alert-danger w-50 m-auto my-5 " role="alert">
        
          <strong>Attention !</strong> ceci sera supprimé définitivement<br />
          Voulez-vous supprimer ce Participant? 
          <br />
          
          <input type="button" onClick={handleClick} value="Oui" className='btn btn-danger mt-3'/>
          <input type="button" onClick={handleButtonNon} value="Non" className='btn btn-success mx-2 mt-3'/>
          
        </div>

    </div>
  )
}

export default DeleteParticipant