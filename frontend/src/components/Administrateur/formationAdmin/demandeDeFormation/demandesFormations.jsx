import React, { useState } from 'react'
import SideBar from '../../../Administrateur/SideBarAdmin/SideBar'
import NavBarAdmin from '../../../Administrateur/NavBar/NavBarAdmin'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ListeFormationAdmin from '../listeFormationsAdmin/listeFormationsAdmin'
import './demandeFormation.css'

const DemandeFormation = () => {

  const navigate = useNavigate();
  const [listevisible,setVisible] = useState(false);

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

const Demandes = ()=>{
  return (
    <center>
    <div className='content'>
      <div className='collabListes'>
            <h1 className="collabListes_title font-bold">Liste des demandes de formations</h1>
            <div className="collabListes_Item">
                <div className="search_form">
                  <input type="text"placeholder="Rechercher une formation" className=""></input>
                  <button className="search_Button"> Rechercher </button>
                </div>
            </div>
      </div>
    </div>
    </center>
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