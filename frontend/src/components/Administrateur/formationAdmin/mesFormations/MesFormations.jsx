import React from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const MesFormationsAdmin = () => {
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
  const {id} = useParams();
  return (
    <div>
        <h1>Toutes vos formations</h1>
        {id}
    </div>
  )
}

export default MesFormationsAdmin