import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import NavBarUser from '../NavBarUser/NavBarUser';
import SliderNouveauxCollabs from '../NouveauxCollaborateurs/slider';


function HomeUser (){
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
        <div className="page">
           <NavBarUser/>
           <SliderNouveauxCollabs/>
        </div>
    )
}

export default HomeUser;