import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import NavBarUser from '../../NavBarUser/NavBarUser';
import SideBarUser from '../../SideBar/SideBarUser';

const ListeFormationUser = () => {
  const [formations,setFormations] = useState([]);
  const[recherche,setRecherche] = useState('');
  const[formationfiltre, setFormationsfiltre] = useState([]);
  //Pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  // Nombre d'éléments par page 
  const itemsPerPage = 15;
   

  const fetchCollaborateur = () => {
    axios.get('http://localhost:8000/api/formation/all_formations')
      .then(res => {setFormations(res.data)})
      .catch(err => console.log(err));
  }
  
  useEffect(() => {
    fetchCollaborateur();
  }, [])
  console.log(formations)
  
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setFormationsfiltre(formations.slice(startIndex, endIndex));
  }, [formations, currentPage])

  const totalPages = Math.ceil(formations.length / itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  }


  return (
    <>
    <div className="page">
      <NavBarUser />
        <div className="content">
          <SideBarUser/>
            <div>
              <div className='collabListes'>
                <h1 className="collabListes_title font-bold">Les formations disponibles</h1>
                  <div className="collabListes_Item">
                    <div className="search_form">
                      <input type="text"placeholder="Rechercher une formation" value={recherche} onChange={(e)=>{setRecherche(e.target.value)}} className=""></input>
                      <button className="search_Button"> Rechercher </button>
                      <Link to="#" className="AddCollab_Link">Organiser une formation</Link>
                    </div>
                  </div>
              </div>
              <table className="listDepartementUser_table">
                <thead>
                  <tr>
                    <th className="w-40">Thème</th>
                    <th className="w-60">Description</th>
                    <th className="w-60">Organisateur(trice)</th>
                  </tr>
                </thead>
                <tbody>
                {recherche === '' || recherche === null ? (formationfiltre.map((formation)=> (
                  <tr key={formation.id}>
                    <td className="w-40">{formation.theme}</td>
                    <td className="w-60">{formation.description}</td>
                    <td className='w-60'>{formation.nomformateur} {formation.prenomformateur}</td>
                    <td className="w-60">
                      {/* lien '/collaborateur/id_departement' */}
                      <button className="table_item_icon">Voir plus</button>
                    </td>
                  </tr>
                ))) : (
                formationfiltre.filter((formations)=>formations.theme.toLowerCase().includes(recherche.toLowerCase()) || formations.description.toLowerCase().includes(recherche.toLowerCase())).map((formation) => (
                  <tr key={formation.id}>
                    <td className="w-40">{formation.theme}</td>
                    <td className="w-60">{formation.description}</td>
                    <td className='w-60'>{formation.nomformateur} {formation.prenomformateur}</td>
                    <td className="w-60">
                      {/* lien '/collaborateur/id_departement' */}
                      <button className="table_item_icon">Voir plus</button>
                    </td>
                  </tr>
                ))
                )}
                </tbody>
              </table>
              <div className="list_pagination">
              {Array.from({length : totalPages}, (_, index) => index + 1).map((page) => (
                <button
                    key={page}
                    className={page === currentPage ? "active" : ""}
                    onClick={() => handlePageChange(page)}
                >
                {page}
                </button>
              ))}
              </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default ListeFormationUser