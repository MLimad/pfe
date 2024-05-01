import {Link} from "react-router-dom"
import { React,useEffect,useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashCan,faPenToSquare,faEye,faList,faPlus,faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import moment from "moment";

function Home() {

  const [data,setData] = useState([]);
  const [searchDate,setSearchDate] = useState('');

  useEffect(()=>{

  if (searchDate) {
    const fetchAllData = async()=>{
      try {
        const res = await axios.get("http://localhost:5000/search/"+searchDate);
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
  };
  fetchAllData();

  }else{
      const fetchAllData = async()=>{
        try {
          const res = await axios.get("http://localhost:5000/");
          setData(res.data);
        } catch (err) {
          console.log(err);
        }
    };
    fetchAllData();

  }
    
  },[searchDate])

 

  return (
    <div className='mx-5'>
        <div className="row d-flex align-items-center">
          <div className="col-3">
            <label htmlFor="searchDate"><FontAwesomeIcon icon={faMagnifyingGlass} /> Recherche</label>
            <select name="" id="" className="form-control" onChange={(e)=>{setSearchDate(e.target.value)}}>
              <option value="">Tous les années scolaire</option>
              <option value="2023-2024">2023/2024</option>
              <option value="2024-2025">2024/2025</option>
              <option value="2025-2026">2025/2026</option>
            </select>
          </div>
          <div className="col text-center">
            <h1> List des formations</h1>
          </div>
          <div className="col-3">
            <Link to={'/formation'} className="btn btn-sm btn-primary my-4 float-end"><FontAwesomeIcon icon={faPlus} /> Ajouter une formation</Link>
          </div>
        </div>
        <table class=" table table-striped table-hover table-bordered text-center">
        
        <thead>
          <tr>
            <th scope="col">Axe</th>
            <th scope="col" style={{'width':'25%'}}>Nom Projet</th>
            <th scope="col">Date Début</th>
            <th scope="col">Nom Etablissement</th>
            <th scope="col">Annee Scolaire</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
    
            {
              data.map(item => (
                <tr key={item.formation_id}>
                  <td>{item.nom_axe}</td>
                  <td>{item.nom_projet}</td>
                  <td>{moment(item.date_debut).format("YYYY-MM-DD")}</td>
                  <td>{item.nom_etab}</td>
                  <td>{item.annee_scolaire}</td>
                  <td><span className={item.status === "Annulé" ? "badge text-bg-danger" : item.status === "En cours" ? "badge text-bg-primary" : item.status === "Achevé" ? "badge text-bg-secondary" : "badge text-bg-warning" } style={{'width':'100%'}}>{item.status}</span></td>
                  <td>
                    <Link to={`/show/${item.formation_id}`} className='btn btn-success btn-sm' title="Voir Plus"><FontAwesomeIcon icon={faEye} /></Link>
                    <Link to={`/update/${item.formation_id}`} className='btn btn-primary btn-sm mx-1' title="Modifier"><FontAwesomeIcon icon={faPenToSquare} /></Link>
                    <Link to={`/participant/${item.formation_id}`} className='btn btn-secondary btn-sm mx-1' title="List Participants"><FontAwesomeIcon icon={faList} /></Link>
                    <Link to={`/delete/${item.formation_id}`} className='btn btn-danger btn-sm' title="Supprimer"><FontAwesomeIcon icon={faTrashCan} /></Link>
                  </td>
                </tr>
              ))
            }    
    
        </tbody>
      </table>
    </div>
  )
}

export default Home
