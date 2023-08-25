import React from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState} from 'react';
import axios from 'axios';

const CollabDepartement = () => {
    const [collabs,setCollab] = useState([]);
    const navigate = useNavigate();
    const {id} = useParams();

    const fetchCollaborateur = () => {
        axios.get('http://localhost:8000/api/collaborateur/all_collaborateurs')
          .then(res => {setCollab(res.data)
        })
          .catch(err => console.log(err));
      }
      console.log(collabs)
      useEffect(() => {
        fetchCollaborateur();
      }, [])
  

    useEffect(() => {
        // const token = Cookies.get('jwt');
        const token = localStorage.getItem('jwt');
        if (!token){
            navigate('/');
        }

        const role = localStorage.getItem('role'); 
        if (!(role === "User")){
            navigate('/home');
        }

    }, [navigate])

    const collaborateurs = collabs.filter((collab) => collab.idDepartement.toString() === id.toString());
    console.log("Collaborateurs filtrés:", collaborateurs); // Vérifiez les collaborateurs après le filtrage
    const departementsUniques = Array.from(new Set(collaborateurs.map(collab => collab.departement)));

    return (
    <div>
        <h1>Les Collaborateurs dans le département {departementsUniques} </h1>
        {collaborateurs.length === 0 ? (
        <p>Pas de collaborateur dans ce département</p>
        ) : (
        collaborateurs.map((collab) => (
            <ul key={collab.id}>
                <li>{collab.nom}</li>
            </ul>
        ))
        )}
    </div>
)
}

export default CollabDepartement