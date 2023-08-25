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

  const fetchCollaborateur = () => {
    axios
      .get('http://localhost:8000/api/collaborateur/all_collaborateurs')
      .then((res) => {
        setCollab(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCollaborateur();
  }, []);

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
  const departementsUniques = Array.from(new Set(collaborateurs.map(collab => collab.departement)));
  console.log("DEPARTEMENT:", departementsUniques); 

  return (
    <div>
      <div className="page">
        <NavBarUser />
        <div className="content">
          <SideBarUser />
          <div>
            <Typography variant="h2">
              Collaborateurs dans le département{' '}
              {departementsUniques.length > 0 ? departementsUniques.join(', ') : 'Inconnu'}
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
                          {collab.adresse}
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
