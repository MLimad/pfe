import Header from './Header'
import { Link,useNavigate,useParams } from 'react-router-dom'
import { React,useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare,faArrowLeft } from '@fortawesome/free-solid-svg-icons';


function UpdateParticipant() {
    
    const {id1} = useParams();
    const {id2} = useParams();
    const [etab,setEtab] = useState([])
    const navigate = useNavigate();
    const [values,setValues] = useState({
        ppr:"",
        nom_pr:"",
        etablissement_id:"",
        formation_id:id1,
        nom_etab : ""
    })

    useEffect(()=>{
        const fetchData = async ()=>{
          try {
    
            const res = await axios.get("http://localhost:5000/participant/"+id2)
            // console.log(res.data)
            // setData(res.data)
            setValues({...values,ppr:res.data[0].ppr,nom_pr:res.data[0].nom_pr,etablissement_id:res.data[0].etablissement_id,nom_etab:res.data[0].nom_etab})
            console.log(values)
            
          } catch (error) {
            console.log(error);
          }


          try {
          const res = await axios.get("http://localhost:5000/etablissement/")
            // console.log(res.data)
            setEtab(res.data)
            
          } catch (error) {
            console.log(error);
          }
        }
        
        fetchData();
      },[])


    const handleChange = (e) =>{
        setValues((prev) =>({...prev,[e.target.name]: e.target.value}))
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()

        try {
            const res =  await axios.put("http://localhost:5000/update_participant/"+id2,values)
            navigate(-1)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='container'>
        <h3>Modifier</h3>
        <hr />
        <form onSubmit={handleSubmit}  className='col-6'>
            <div className="mb-3">
                <label htmlFor="ppr" className='form-label'>PPR</label>
                
                        <input type="number" id='ppr' name='ppr' value={values.ppr} onChange={handleChange} min={1111111} max={9999999} className="form-control"  />
                
            </div>
            <div className="mb-3">
                <label htmlFor="nom_prof" className='form-label'>Nom Professeur </label>

                        <input type="text" id='nom_pr' name='nom_pr' value={values.nom_pr}  onChange={handleChange} className="form-control" required />
               
            </div>
            <div className="mb-3">
                <label htmlFor="etablissement_id" className='form-label'>Nom Etablissement</label>
                <select id="etablissement_id" name="etablissement_id" onChange={handleChange} className='form-control'>
                     
                    <option selected disabled value={values.etablissement_id}>{values.nom_etab}</option>
                    
                    {
                        etab.map(item=>(
                            <option value={item.etablissement_id} >{item.nom_etab}</option>
                        ))
                    }
                </select>
            </div>
                     
            <Link to={-1} className='btn btn-dark btn-sm '><FontAwesomeIcon icon={faArrowLeft} /> Annuler</Link>
            <button type='submit' className='btn btn-primary btn-sm mx-3'><FontAwesomeIcon icon={faPenToSquare} /> Modifier</button>
        </form>
    </div>
  )
}

export default UpdateParticipant