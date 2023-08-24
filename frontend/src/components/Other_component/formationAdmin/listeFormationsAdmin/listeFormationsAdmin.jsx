import React from 'react'
import SideBar from '../../../Administrateur/SideBarAdmin/SideBar'
import NavBarAdmin from '../../../Administrateur/NavBar/NavBarAdmin'
import { Link } from 'react-router-dom'

const ListeFormationAdmin = () => {
  return (
    <div className='page'>
    <NavBarAdmin />
    <div className='content'>
    <SideBar/>
    <div>
            <div className="collabListes">
            <h1 className="collabListes_title font-bold">Les formations disponibles</h1>
            <div className="collabListes_Item">
                <div className="search_form">
                  <input type="text"placeholder="Rechercher une formation" className=""></input>
                  <button className="search_Button"> Rechercher </button>
                  <Link to="#" className="AddCollab_Link">Organiser une formation</Link>
                </div>
            </div>
            </div>
    </div>
    <div className='liste_formation'>

    </div>
    </div>
    </div>
  )
}

export default ListeFormationAdmin