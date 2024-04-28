import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link,useNavigate} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft, faFloppyDisk} from '@fortawesome/free-solid-svg-icons'
import moment from 'moment';


function Formation() {

  // Get Data From DB
  const [projetDB,setProjetDB] = useState([]);
  const [axeDB,setAxeDB] = useState([]);
  const [etabDB,setEtabDB] = useState([]);
  const [isProjectVisible,setIsProjectVisible] = useState(true);
  const todayDate = moment(new Date()).format("YYYY-MM-DD");
  const [isDatedisabled,setIsDatedisabled] = useState(true)
  const [getFirstDate,setGetFirstDate]=useState("");
  const navigate = useNavigate();

  // Values from Input to send
  const [values,setValues] = useState({
    axe:"",
    annee_scolaire:"",
    projet:"",
    module:"",
    status:1,
    lieuFormation:"",
    dateDebut:"",
    dateFin:"",
  })



  useEffect(()=>{

    // axios.get("http://localhost:5000/projet")
    // .then(res=>{
    //   setProjetDB(res.data);
    // })
    // .catch(err => console.log(err));

    axios.get("http://localhost:5000/axe")
    .then(res=>{
      setAxeDB(res.data);
    })
    .catch(err => console.log(err));

    axios.get("http://localhost:5000/etablissement")
    .then(res=>{
      setEtabDB(res.data);
    })
    .catch(err => console.log(err));

    // axios.get("http://localhost:5000/status")
    // .then(res=>{
    //   setStatusDB(res.data);
    // })
    // .catch(err => console.log(err));

  },[])

  const handleDate = (e) =>{
    setValues((prev)=>({...prev,dateDebut: e.target.value}))
    setGetFirstDate(e.target.value)
    setIsDatedisabled(false)
  }

  const handleChange = (e) =>{

    // setValues((prev) =>({...prev,[e.target.name]: e.target.value}))
      // (e) => values.dateDebut = e.target.value
    
    
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/formation",values)
      navigate("/")
    } catch (error) {
      console.log(error)
    }
    // console.log(values)
  }

  // Get ID From Select Box Axe
  const handleCick = async(e) => {
    const selectedAxe = e.target.value
    setIsProjectVisible(false);

    try {
      const res = await axios.get("http://localhost:5000/projet/"+selectedAxe)
      
        // console.log(res.data)
        setProjetDB(res.data)
        
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <div className='container col-6'>
      <form onSubmit={handleSubmit}>
        
        <div className="mb-3">
          <label htmlFor="Annee Scolaire" className="form-label">Annee Scolaire</label>
          <select name="annee_scolaire" id="Annee Scolaire" className="form-control"  onChange={(e) => values.annee_scolaire = e.target.value} >
            <option selected>Select ...</option>
            <option value="2023/2024">2023/2024</option>
            <option value="2024/2025">2024/2025</option>
            <option value="2025/2026">2025/2026</option>
          </select>
        </div>
        <div className="mb-3">
          <div className="row">
            <div className="col">
            <label htmlFor="axe" className='form-label'>Axe</label>
              <select name="axe selectAxeID" id="axe" className="form-control"  onChange={(e) => values.axe = e.target.value} >
                 <option selected>Select ...</option>
            {
              axeDB.map((item)=>(
                <option value={item.axe_id} onClick={handleCick}>{item.nom_axe}</option>
              ))
            }
          </select>
          
            </div>
            
            <div className="col" style={{visibility:isProjectVisible === true ? "hidden" :"visible"}}>
            <label htmlFor="projet"  className='form-label'>Projet</label>
          <select name="projet" id="projet" className="form-control"  onChange={(e) => values.projet = e.target.value}  >
            <option selected>Select ...</option>
              {
              projetDB.map((item)=>(
                <option value={item.projet_id}>{item.nom_projet}</option>
              ))
            }
          </select>
            </div>
            
          </div>
          
        </div>

        <div className="mb-3">
          <label htmlFor="module"  className='form-label'>Module</label>
          <input type="text" name="module" id="module" className="form-control"  onChange={(e) => values.module = e.target.value} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="lieuFormation"  className='form-label'>Lieu de Formation</label>
          <select name="lieuFormation" id="lieuFormation" className='form-control'  onChange={(e) => values.lieuFormation = e.target.value}>
          <option selected>Select ...</option>
          {
              etabDB.map((item)=>(
                <option value={item.etablissement_id}>{item.nom_etab}</option>
              ))
            }
          </select>
        </div>
        
        <div className="mb-3">
            <div className="row">
              <div className="col">
                <label htmlFor="dateDebut" className='form-label'>Date Début</label>
                <input type="date" min={todayDate} name="dateDebut" id="dateDebut" className='form-control'  onChange={handleDate} required/>
              </div>
              <div className="col">
                <label htmlFor="dateFin" className='form-label'>Date Fin</label>
                <input type="date" min={getFirstDate} name="dateFin" id="dateFin" className='form-control'  onChange={(e) => values.dateFin = e.target.value} required disabled={isDatedisabled} />
              </div>
            </div>
        </div>
        
        <div className="mb-3 my-5">
          <Link to={"/"} className='btn btn-sm btn-dark '><FontAwesomeIcon icon={faArrowLeft} /> Retour</Link>
          <button type='submit' className='btn btn-sm btn-success mx-3'><FontAwesomeIcon icon={faFloppyDisk} /> Enregistrer</button>
        </div>

      </form>

    </div>
  )
}

export default Formation