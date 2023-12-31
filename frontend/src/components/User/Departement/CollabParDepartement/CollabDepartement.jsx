import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NavBarUser from '../../NavBarUser/NavBarUser';
import SideBarUser from '../../SideBar/SideBarUser';
import { Typography, Avatar } from '@material-tailwind/react';

const CollabDepartement = () => {
  const [collabs, setCollab] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const[departement,setDepartement] = useState([]);

  const fetchCollaborateur = () => {
    axios
      .get('http://localhost:8000/api/collaborateur/all_collaborateurs')
      .then((res) => {
        setCollab(res.data);
      })
      .catch((err) => console.log(err));
    axios.get("http://localhost:8000/api/departement/all_departement")
      .then((response) => {
           setDepartement(response.data);
      })
      .catch((err)=>{
          console.error('Erreur lors de la récupération des données:', err)
      })
  };

  useEffect(() => {
    fetchCollaborateur();
  }, []);
  console.log(collabs);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      navigate('/');
    }

    const role = localStorage.getItem('role');
    if (!(role === 'User')) {
      navigate('/home');
    }
  }, [navigate]);

  const collaborateurs = collabs.filter(
    (collab) => collab.idDepartement.toString() === id.toString()
  );
  
  // Vérifiez les collaborateurs après le filtrage

  const nomdepartement= departement.filter((departement)=>departement.id.toString()=== id.toString());
  const departementsUniques = Array.from(new Set(nomdepartement.map(dep => dep.nomDepartement)));
 
  return (
    <div>
      <div className="page">
        <NavBarUser />
        <div className="content">
          <SideBarUser />
          <div>
            <Typography variant="h2">
              Collaborateurs dans le département{' '}{departementsUniques}
            </Typography>
            {collaborateurs.length === 0 ? (
              <p>Pas de collaborateur dans ce département</p>
            ) : (
              <div className="m-5 p-5 bg-white grid grid-cols-12 rounded-lg">
                <div className="flex flex-row">
                  {collaborateurs.map((collab) => (
                    <>
                      <Avatar
                        src={`http://localhost:8000/${collab.image}`}
                        alt={collab.nom}
                        size="xxl"
                        className="m-3"
                      />
                      <div className="flex flex-col justify-center">
                        <Typography variant="h6">
                          {collab.prenom} {collab.nom}
                        </Typography>
                        <Typography variant="h6">{collab.matricule}</Typography>
                        <Typography variant="small">{collab.poste}</Typography>
                        <Typography variant="small">
                          {collab.quartier}, {collab.ville}
                        </Typography>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollabDepartement;
