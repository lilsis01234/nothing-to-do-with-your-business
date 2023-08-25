import React from 'react'
import SideBarUser from '../../../User/SideBar/SideBarUser'
import NavBarUser from '../../../User/NavBarUser/NavBarUser'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Formations = () => {
  const navigate = useNavigate();
  useEffect(() => {
      // const token = Cookies.get('jwt');
      const token = localStorage.getItem('jwt');
      console.log(token);
      if (!token){
          navigate('/');
      }
      const role = localStorage.getItem('role'); 
      if (!(role === "User")){
          navigate('/home');
      }

  }, [navigate])
  return (
    <div className='page'>
    <NavBarUser />
    <div className='content'>
    <SideBarUser/>
    <div>
            <div className="collabListes">
            <h1 className="collabListes_title font-bold">Liste des formations</h1>
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

export default Formations