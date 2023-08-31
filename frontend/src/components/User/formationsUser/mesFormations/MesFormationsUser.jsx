import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const MesFormationsUser = () => {

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
    
  const {id} = useParams();
  return (
    <div>
        <h1>Toutes vos formations</h1>
        {id}
    </div>
  )
}

export default MesFormationsUser