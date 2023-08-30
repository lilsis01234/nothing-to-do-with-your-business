import React, { useState } from 'react'
import SideBar from '../../../Administrateur/SideBarAdmin/SideBar'
import NavBarAdmin from '../../../Administrateur/NavBar/NavBarAdmin'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ListeFormationAdmin from '../listeFormationsAdmin/listeFormationsAdmin'
import './demandeFormation.css'
import axios from 'axios'

const DemandeFormation = () => {

  const navigate = useNavigate();
  const [listevisible,setVisible] = useState(false);
  const[demandeFormation,setDemandeFormation] = useState([]);
  const [recherche,setRecherche]= useState(null);

  useEffect(() => {
    // const token = Cookies.get('jwt');
    const token = localStorage.getItem('jwt');
    console.log(token);
    if (!token){
        navigate('/');
    }

    const role = localStorage.getItem('role'); 
    if (!(role === "Administrateur")){
        navigate('/home');
    }

    }, [navigate])

    const fetchCollaborateur = () => {
      axios.get('http://localhost:8000/api/formation/all_demandes_formations')
        .then(res => {setDemandeFormation(res.data)})
        .catch(err => console.log(err));
    }

    useEffect(() => {
      fetchCollaborateur();
    }, [])
    console.log(demandeFormation)

const Demandes = ()=>{
  return (
    <>
    <center>
    <div className='content'>
      <div className='collabListes'>
        <h1 className="collabListes_title font-bold">Liste des demandes de formations</h1>
          <div className="collabListes_Item">
            <div className="search_form">
              <input type="text"placeholder="Rechercher une formation" value={recherche} onChange={(e)=>{setRecherche(e.target.value)}} className=""></input>
              <button className="search_Button"> Rechercher </button>
            </div>
          </div>
      </div>
    </div>
    </center>

    {demandeFormation.length !== 0 ? (
      <table className="listDemandeFormation">
          <thead>
              <tr>
                  <th >Thème</th>
                  <th >Description</th>
                  <th >Organisateur(trice)</th>
                  <th >Voir plus</th>
                  <th >Approuver</th>
                  <th >Désapprouver</th>
              </tr>
          </thead>
          <tbody>
              {recherche === '' || recherche === null ? (demandeFormation.map((formation)=> (
              <tr key={formation.id}>
                  <td >{formation.theme}</td>
                  <td >{formation.description}</td>
                  <td >{formation.nomformateur} {formation.prenomformateur}</td>

                  <td ><button className="table_item_icon">Voir plus</button></td>
                  <td >
                    {/* lien '/formation/id_formation' */}
                    <button className="table_item_icon">Approuver</button>
                  </td>
                  <td >
                    {/* lien '/delete id' */}
                    <button className="table_item_icon">Désapprouver</button>
                  </td>
              </tr>
              ))) : (
              demandeFormation.filter((formations)=>formations.theme.toLowerCase().includes(recherche.toLowerCase()) || formations.description.toLowerCase().includes(recherche.toLowerCase())).map((formation) => (
              <tr key={formation.id}>
                  <td >{formation.theme}</td>
                  <td >{formation.description}</td>
                  <td >{formation.nomformateur} {formation.prenomformateur}</td>
                  {/* lien formation/idFormation voir plus */}
                  <td><button className="table_item_icon">Voir plus</button></td>
                  <td >
                    {/* lien '/collaborateur/id_departement' */}
                    <button className="table_item_icon">Approuver</button>
                  </td>
                  <td >
                    {/* lien '/delete id' */}
                    <button className="table_item_icon">Désapprouver</button>
                  </td>
              </tr>
              ))
              )}
          </tbody>
      </table>):
    (
      <h3>Aucune demande de formation pour le moment</h3>
    ) 
    }
    </>
  )
}

  return (
    <div className='page'>
      <NavBarAdmin />
        <div className='content'>
          <SideBar/>
            <div>
              <div className="collabListes">
                <button className="visible" onClick={() => setVisible(!listevisible)}>
                <h1>{listevisible ? 'Voir les demandes de formations' : 'Voir les formations disponibles'}</h1>
                </button>
                {listevisible ? <ListeFormationAdmin /> : <Demandes />}
              </div>
            </div>
        </div>
    </div>
  )
}

export default DemandeFormation