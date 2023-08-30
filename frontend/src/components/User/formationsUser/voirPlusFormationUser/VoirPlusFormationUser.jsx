import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const VoirPlusFormationUser = () => {
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
        
  return (
    <div>VoirPlusFormationUser</div>
  )
}

export default VoirPlusFormationUser