import { Card } from '@material-ui/core'
import React,{useEffect, useState} from 'react'
import ApiUrl from '../../../../ServerApi'
import { useStateValue } from '../../../../data/StateProvider'

const Details = () => {
    const [{ user }, dispatch] = useStateValue();
    const[departmentlist,setDepartmentlist]=useState()
    useEffect(()=>{
        fetch(`${ApiUrl}/moreInfo/department`, {
            method: "POST",
      
            body: JSON.stringify({
              college: user.collegeName,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then((response) => response.json())
            .then((json) => {
              setDepartmentlist(json.ids);
      
              console.log(json);
            });
        
      
    },[])

    const getlablist=()=>{
        fetch(`${ApiUrl}/moreInfo/department`, {
            method: "POST",
      
            body: JSON.stringify({
              college: user.collegeName,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then((response) => response.json())
            .then((json) => {
              setDepartmentlist(json.ids);
      
              console.log(json);
            });
        
      


    }
  return (
    <div>

         { departmentlist && departmentlist.map((item)=>{
  return (
    <Card  key={item} Style={{maxWidth:300}} onClick={getlablist}>
    Department :  {item}
 </Card>
   
  )
})}






    </div>
  )
}

export default Details