import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import ApiUrl from '../../../../../ServerApi'

const SuperAdmindetail = (props) => {
    const history=useHistory()
    const [departmentlist,setDepartmentlist]=useState()

    useEffect(()=>{
        if (props.location.state){
            
            
    fetch(`${ApiUrl}/moreInfo/getdetail/university/college`,{
        method: "POST",
    
        body: JSON.stringify({
          university: props.location.state.university,
          collegeName:props.location.state.collegeName
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
            setDepartmentlist(json.list)
      
    
        }).catch((err)=>{
          console.log(err,"hhh")
        })

























        }
        else(
            history.push("/settings")
        )
    },[])
  return (
    <div>
        {
            departmentlist&&
            departmentlist.map((item)=>{
                return (
                  <div key={item}> {item}</div>
                )
              })}
        

    </div>
  )
}

export default SuperAdmindetail