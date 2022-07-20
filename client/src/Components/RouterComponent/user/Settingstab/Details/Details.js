import React from 'react'
import { useStateValue } from '../../../../../data/StateProvider' 
import Detailsadmin from './Detailsadmin';
import Detailssuperadmin from './Detailssuperadmin';

const Details = () => {
  const [{ user }, dispatch] = useStateValue();
  const role= user.role
  
  
  
  return (
    <div>
      {role==="admin" && <Detailsadmin/>}
      {role==="superadmin" && <Detailssuperadmin/>}
    </div>
  )
}

export default Details