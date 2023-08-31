import React from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from '../../../Administrateur/SideBarAdmin/SideBar'
import NavBarAdmin from '../../../Administrateur/NavBar/NavBarAdmin'
import { Link } from 'react-router-dom';

const MesFormationsAdmin = () => {

    const[formationfiltre, setFormationsfiltre] = useState([]);

    //Pour la pagination
    const [currentPage, setCurrentPage] = useState(1);
    // Nombre d'éléments par page 
    const itemsPerPage = 15;
    const[recherche,setRecherche] = useState('');
    const {id} = useParams();
    const [formations,setFormations] = useState([]);
    useEffect(() => {
        const fetchCollaborateur = () => {
          axios.get(`http://localhost:8000/api/formation/formations/${id}`)
            .then(res => { setFormations(res.data) })
            .catch(err => console.log(err));
        }
      
        fetchCollaborateur();
      }, [id])

    console.log(formations)

    const navigate = useNavigate();
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
    // maka localStorage.getItem('id')
 
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
    <div className='page'>
     <NavBarAdmin />
      <div className='content'>
        <SideBar/>
          <div>
           <div className="collabListes">
            <div className='content'>
             <div className="collabListes">
                <h1 className="collabListes_title font-bold">Toutes les formations que vous avez organisées</h1>
                 <div className="collabListes_Item">
                 <div className="search_form">
                 <input type="text"placeholder="Rechercher une formation" value={recherche} onChange={(e)=>{setRecherche(e.target.value)}} className=""></input>
                  <button className="search_Button"> Rechercher </button>
                <Link to="#" className="AddCollab_Link">Organiser une nouvelle formation</Link>
                </div>
            </div>
      </div>
    </div>
            {formations.length !== 0 ? (
            <>
            <table className="listDepartementUser_table">
            <thead>
                <tr>
                <th className="w-40">Thème</th>
                <th className="w-80">Description</th>
                <th className="w-80">Suivi</th>
                <th className="w-80">Voir plus</th>
                </tr>
            </thead>
            <tbody>
                {recherche === '' || recherche === null ? (formationfiltre.map((formation)=> (
                <tr key={formation.id}>
                    <td className="w-40">{formation.theme}</td>
                    <td className="w-80">{formation.description}</td>
                    <td className="w-80">{formation.approbation === true ?(<h4>Approuvé</h4>):(<h4>Pas encore approuvé</h4>)}</td>
                    <td className="w-80">
                    <button className="table_item_icon"><Link to= {`/admin/formation/${formation.id}`}>Voir plus</Link></button>
                    </td>
                
                    </tr>
                ))) : (
                formationfiltre.filter((formations)=>formations.theme.toLowerCase().includes(recherche.toLowerCase()) || formations.description.toLowerCase().includes(recherche.toLowerCase())).map((formation) => (
                    <tr key={formation.id}>
                    <td className="w-40">{formation.theme}</td>
                    <td className="w-80">{formation.description}</td>
                    <td className="w-80">{formation.approbation === true ?(<h4>Approuvé</h4>):(<h4>Pas encore approuvé</h4>)}</td>
                    <td className="w-80">
                        <button className="table_item_icon"><Link to= {`/admin/formation/${formation.id}`}>Voir plus</Link></button>
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
    </>
    ):(
      <h3>Vous n'avez pas encore organisé de formation</h3>
    )}
    </div>
  </div>
 </div>
</div>
)
}

export default MesFormationsAdmin