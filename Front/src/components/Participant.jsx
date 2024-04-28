import React, { useEffect, useState } from 'react'
import { Link,useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus,faArrowLeft,faTrashCan,faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import Header from '../components/Header'
import axios from 'axios'



function Participant() {
  const [data,setData] = useState([]);
  const [participant,setParticipant] = useState([]);
  const {id} = useParams();
  let count = 1



  useEffect(()=>{
    const fetchData = async ()=>{
      try {

        const res = await axios.get("http://localhost:5000/show/"+id)
        // console.log(res.data)
        setData(res.data)
        
      } catch (error) {
        console.log(error);
      }

      try {

        const res = await axios.get("http://localhost:5000/participant/projet/"+id)
        // console.log(res.data)
        setParticipant(res.data)
        
      } catch (error) {
        console.log(error)
      }
    }
    
    fetchData();
  },[])

  return (
    <div className='container'>
      <Link to={"/"} className='btn btn-primary btn-sm '><FontAwesomeIcon icon={faArrowLeft} /> Retour</Link>
      <Link to={"/addProf/"+id} className='btn btn-success btn-sm mx-2'><FontAwesomeIcon icon={faPlus} /> Ajouter un nouveau</Link>
      <h3 className='my-3'>A propos de Formation :</h3>
      <hr />
      {
        data.map(item=>(
          <div>
             <div className='row'>
                <div className="col"><p><strong>Nom Projet</strong>: {item.nom_projet} </p> </div>
                <div className="col"><p><strong>Axe</strong> : {item.nom_axe}</p></div>
              </div>
              <div className="row">
                <div className="col"><p><strong>Etablissement</strong> : {item.nom_etab}</p></div>
                <div className="col"><p><strong>Module</strong> : {item.module}</p></div>
              </div>
          </div>
         
         
        ))
      }

      <h3 className='my-3'>List des Participants :</h3>
      <hr />
              <table className="table table table-striped table-hove table-bordered text-center" >
                  <thead >
                    <th>N°</th>
                    <th>PPR</th>
                    <th>Nom Professeur</th>
                    <th>Nom Etablissement</th>
                    <th>Actions</th>
                  </thead>
                  <tbody>
                    {participant.length === 0 ? <tr><td colspan="5" className='text-center'><p>&#x1F60C; <br /> <span className='badge text-bg-secondary'>Aucun Participant</span>  </p></td></tr>:""}
                    
                    {
                     
                      participant.map(item =>(
                        <tr>
                          <th>{count++}</th>
                          <td>{item.ppr}</td>
                          <td>{item.nom_pr}</td>
                          <td>{item.nom_etab}</td>
                          <td>
                            <Link to={"/updateParticipant/"+id+"/"+item.participant_id} className='btn btn-sm btn-success' title='Modifier'><FontAwesomeIcon icon={faPenToSquare} /></Link>
                            <Link to={"/DeleteParticipant/"+item.participant_id} className='btn btn-sm btn-danger mx-2' title='Supprimer'><FontAwesomeIcon icon={faTrashCan} /></Link>
                            </td>
                        </tr>
                      ))
                    }
                  </tbody>
              </table>
    </div>
  )
}

export default Participant