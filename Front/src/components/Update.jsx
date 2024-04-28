import {Link,useNavigate, useParams} from "react-router-dom"
import { React,useEffect,useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft, faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import moment from "moment";


function Update() {
  const {id} = useParams();
  const [data,setData] = useState([]);
  const [projetDB,setProjetDB] = useState([]);
  const [axeDB,setAxeDB] = useState([]);
  const [etabDB,setEtabDB] = useState([]);
  const [statusDB,setStatusDB] = useState([]);
  const todayDate = moment(new Date()).format("YYYY-MM-DD");
  const [getFirstDate,setGetFirstDate]=useState("");
  const navigate = useNavigate();
  const [values,setValues] = useState({
    axe:"",
    annee_scolaire:"",
    projet:"",
    module:"",
    status:"",
    lieuFormation:"",
    dateDebut:"",
    dateFin:"",
  })

  useEffect(()=>{

    const fetchAllData = async()=>{
      try {
        const res = await axios.get("http://localhost:5000/update/"+id);
        setData(res.data)
        console.log(data)
        setValues({...values,
          axe:res.data[0].axe_id,
          annee_scolaire:res.data[0].annee_scolaire,
          projet:res.data[0].projet_id,
          module:res.data[0].module,
          lieuFormation:res.data[0].etablissement_id,
          dateDebut:res.data[0].date_debut,
          dateFin:res.data[0].date_fin,
          status:res.data[0].status_id

        })
      } catch (err) {
        console.log(err);
      }

      // Get Axe From DB
      axios.get("http://localhost:5000/axe")
      .then(res=>{
        setAxeDB(res.data);
      })
      .catch(err => console.log(err));

      // Get Etablissemnt From DB
      axios.get("http://localhost:5000/etablissement")
      .then(res=>{
        setEtabDB(res.data);
      })
      .catch(err => console.log(err));

       // Get Status From DB
       axios.get("http://localhost:5000/status")
       .then(res=>{
         setStatusDB(res.data);
       })
       .catch(err => console.log(err));


  };
  fetchAllData();

  },[])

  // const handleDate = (e) =>{
  //   setValues((prev)=>({...prev,dateDebut: e.target.value}))
  //   setGetFirstDate(e.target.value)
  // }

    // Get ID From Select Box Axe
    const handleClick = async(e) => {
      const selectedAxe = e.target.value  
      try {
        const res = await axios.get("http://localhost:5000/projet/"+selectedAxe)
        
          // console.log(res.data)
          setProjetDB(res.data)      
      } catch (error) {
        console.log(error)
      }
      
    }

    const handleSubmit = async (e) =>{
      e.preventDefault();
      try {
        await axios.put("http://localhost:5000/updateFormation/"+id,values)
        navigate("/")
      } catch (error) {
        console.log(error)
      }
      // console.log(values)
    }
  
    const handleChange  = (e) =>{
      setValues({...values,[e.target.name]:e.target.value})
    }
 
  return (
    <div className="container col-6">
      <form onSubmit={handleSubmit}>
        
        <div className="mb-3">
          <label htmlFor="Annee Scolaire" className="form-label">Annee Scolaire</label>
          <select name="annee_scolaire" id="Annee Scolaire" className="form-control"  onChange={(e) => values.annee_scolaire = e.target.value} >
            <option selected disabled>{values.annee_scolaire}</option>
            <option value="2023/2024">2023/2024</option>
            <option value="2024/2025">2024/2025</option>
            <option value="2025/2026">2025/2026</option>
          </select>
        </div>
        <div className="mb-3">
          <div className="row">
            <div className="col">
            <label htmlFor="axe" className='form-label'>Axe</label>
              <select name="axe selectAxeID" id="axe" className="form-control"  onChange={handleChange} onClick={handleClick}>
                 {
                  data.map(item => (
                    <option selected disabled>{item.nom_axe}</option>
                  ))
                 }
                 {
                  axeDB.map(item=>(
                    <option value={item.axe_id}>{item.nom_axe}</option>

                  ))
                }
          </select>
          
            </div>
            
            <div className="col">
            <label htmlFor="projet"  className='form-label'>Projet</label>
          <select name="projet" id="projet" className="form-control"  onChange={handleChange}  >
              {
                  data.map(item => (
                    <option selected disabled>{item.nom_projet}</option>
                  ))
                 }
              {
                  projetDB.map(item=>(
                    <option value={item.projet_id}>{item.nom_projet}</option>

                  ))
                }
          </select>
            </div>
            
          </div>
          
        </div>

        <div className="mb-3">
          <label htmlFor="module"  className='form-label'>Module</label>
          <input type="text" name="module" id="module" className="form-control" value={values.module}  onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="lieuFormation"  className='form-label'>Lieu de Formation</label>
          <select name="lieuFormation" id="lieuFormation" className='form-control'  onChange={handleChange}>
          {
                  data.map(item => (
                    <option selected disabled>{item.nom_etab}</option>
                  ))
                 }
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
                <input type="date"   name="dateDebut" id="dateDebut" className='form-control' value={moment(values.dateDebut).utc().format('YYYY-MM-DD')} onChange={handleChange}/>
              </div>
              <div className="col">
                <label htmlFor="dateFin" className='form-label'>Date Fin</label>
                <input type="date" min={values.dateDebut} name="dateFin" id="dateFin" className='form-control' value={moment(values.dateFin).utc().format('YYYY-MM-DD')}  onChange={handleChange}  />
              </div>
            </div>
        </div>

        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status</label>
          <select name="status" id="status" className="form-control" onChange={handleChange} >
          {
                  data.map(item => (
                    <option selected disabled>{item.status}</option>
                  ))
                 }
           {
            statusDB.map(item =>(
              <option value={item.status_id}>{item.status}</option>

            ))
           }
          </select>
        </div>
        
        <div className="mb-3 my-5">
          <Link to={"/"} className='btn btn-sm btn-dark '><FontAwesomeIcon icon={faArrowLeft} /> Retour</Link>
          <button type='submit' className='btn btn-sm btn-primary mx-3'><FontAwesomeIcon icon={faPenToSquare} /> Modifier</button>
        </div>

      </form>
    </div>
  )
}

export default Update