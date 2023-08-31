import React from 'react'
import { useParams } from 'react-router-dom';

const MesFormationsUser = () => {
    // maka localStorage.getItem('id')
  const {id} = useParams();
  return (
    <div>
        <h1>Toutes vos formations</h1>
        {id}
    </div>
  )
}

export default MesFormationsUser