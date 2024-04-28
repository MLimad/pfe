import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft,faPrint} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import moment from 'moment';


function Show() {

  const [data,setData] = useState([]);
  const {id} = useParams();

  useEffect(()=>{
    const fetchData = async ()=>{
      try {

        const res = await axios.get("http://localhost:5000/show/"+id)
        // console.log(res.data)
        setData(res.data)
        
      } catch (error) {
        console.log(error);
      }
    }
    
    fetchData();
  },[])

  const handlePrint = ()=>{
      window.print();
  }

  return (
    <div className='container'>
      <Link to={'/'} className='btn btn-sm btn-primary' ><FontAwesomeIcon icon={faArrowLeft} /> Retour</Link>
      <button onClick={handlePrint} className='btn btn-sm btn-secondary mx-2' title='Imprimer'><FontAwesomeIcon icon={faPrint} /> </button>
      <h3 className='my-2'>Plus d'informations :</h3>
      <hr />
      <table className="table table-striped table-hover" my-5>
        
          {
            data.map((item,index) =>(
              <tbody>
                <tr>
                  <th>Annee Scolaire :</th>
                  <td>{item.annee_scolaire}</td>
                </tr>
                <tr>
                  <th>Axe :</th>
                  <td>{item.nom_axe}</td>
                </tr>
                <tr>
                  <th>Etablissement :</th>
                  <td>{item.nom_etab}</td>
                </tr>
                <tr>
                  <th>Address :</th>
                  <td>{item.adresse}</td>
                </tr>
                <tr>
                  <th>Téléphone :</th>
                  <td>{item.telephone}</td>
                </tr>
                <tr>
                  <th>Nom de projet :</th>
                  <td>{item.nom_projet}</td>
                </tr>
                <tr>
                  <th>Module :</th>
                  <td>{item.module}</td>
                </tr>
                <tr>
                  <th>Date Début :</th>
                  <td>{moment(item.date_debut).format("YYYY-MM-DD")}</td>
                </tr>
                <tr>
                  <th>Date Fin :</th>
                  <td>{moment(item.date_fin).format('YYYY-MM-DD')}</td>
                </tr>
                <tr>
                  <th>Status :</th>
                  <td>{item.status}</td>
                </tr>
                                
             </tbody>
            ))
          }

      </table>
      

    </div>
  )
}

export default Show