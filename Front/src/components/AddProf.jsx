import React, { useEffect, useState } from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft, faFloppyDisk} from '@fortawesome/free-solid-svg-icons'

function AddProf() {
    // Get Formation ID
    const {id} = useParams();
    const [etab,setEtab] = useState([])
    const navigate = useNavigate()
    const [values,setValues] = useState({
        "ppr":"",
        "nom_pr":"",
        "etablissement_id":"",
        "formation_id":id
    })

    useEffect(()=>{
        const fetchData = async ()=>{
          try {
    
            const res = await axios.get("http://localhost:5000/etablissement")
            setEtab(res.data)
            
          } catch (error) {
            console.log(error);
          }
        }
        
        fetchData();
      },[])

      const handleSubmit = async(e) =>{
                e.preventDefault();
        
            try {
                const res = await axios.post("http://localhost:5000/addNewParticipant",values)      
                navigate(-1)
            } catch (error) {
                console.log(error)
            }
      
    }
  


    
  return (
    <div className='container'>
        <h3>Ajouter un nouveau</h3>
        <hr />
        <form onSubmit={handleSubmit} className='col-6'>
            <div className="mb-3">
                <label htmlFor="ppr" className='form-label'>PPR</label>
                <input type="number" min={1111111} max={9999999} id='ppr' onChange={(e)=>{values.ppr = e.target.value}} className="form-control" placeholder='123567' required />
            </div>
            <div className="mb-3">
                <label htmlFor="nom_prof" className='form-label'>Nom Professeur </label>
                <input type="text" id='nom_prof' onChange={(e)=>{values.nom_pr = e.target.value}} className="form-control" placeholder='Nom et prénom' required />
            </div>
            <div className="mb-3">
                <label htmlFor="nom_etab" className='form-label'>Nom Etablissement</label>
                <select name="" id="nom_etab" onChange={(e)=>{values.etablissement_id = e.target.value}} className='form-control'>
                    <option>Select ...</option>
                    {
                        etab.map(item =>(
                            <option value={item.etablissement_id}>{item.nom_etab}</option>
                        ))
                    }
                </select>
            </div>

            <Link to={-1} className='btn btn-dark btn-sm '><FontAwesomeIcon icon={faArrowLeft} /> Retour</Link>
            <button type="submit" className='btn btn-sm btn-success mx-3'><FontAwesomeIcon icon={faFloppyDisk} /> Enregistrer</button>

        </form>
    </div>
  )
}

export default AddProf