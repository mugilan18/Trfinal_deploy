import { Button, Card } from '@material-ui/core'
import React,{useEffect, useState} from 'react'
import ApiUrl from '../../../../../ServerApi'
import { useStateValue } from '../../../../../data/StateProvider' 
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useHistory, Link } from "react-router-dom";
import { Box, Paper } from '@mui/material';
const Details = () => {
    const [{ user }, dispatch] = useStateValue();
    const[departmentlist,setDepartmentlist]=useState()
    const[universitylist,setUniversitylist]=useState()
    const[university,setUniversity]=useState()
    const[collegelist,setCollegelist]=useState()
    const[collegeName,setCollegeName]=useState()
    const history = useHistory()
    useEffect(()=>{

      fetch(`${ApiUrl}/moreInfo/all/university`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUniversitylist(data.ids);
      });
      
    },[])

  // getcollege
  const fetchcollege = (university) => {
    setUniversity(university);
    setCollegeName("");
 

    fetch(`${ApiUrl}/moreInfo/respectivecollege`, {
      method: "POST",

      body: JSON.stringify({
        university: university,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setCollegelist(json.ids);
        console.log(json);
      });
  }

  //getdetail
  const getdetail=()=>{
    fetch(`${ApiUrl}/moreInfo/getdetail/university/college`,{
    method: "POST",

    body: JSON.stringify({
      university: university,
      collegeName:collegeName
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
  
     console.log(json.list)
      if(json.list.length > 0){
        setDepartmentlist(json.list)
      }
     

    }).catch((err)=>{
      console.log(err,"hhh")
    })
}

//getmoreinfo
const getmoreinfo=(department,college,university)=>{
console.log(department,college,university)

fetch(`${ApiUrl}/moreInfo/getdetail/university/college/department`,{
  method: "POST",

  body: JSON.stringify({
    university: university,
    collegeName:collegeName,
    department:department
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
})
  .then((response) => response.json())
  .then((json) => {

   console.log(json)
  
   

  }).catch((err)=>{
    console.log(err,"hhh")
  })




}

  return (
    <div>

      
      {universitylist && (
                      <div className="form-group">
                        <label className="text-muted">University</label>
                        <br /> <br />
                        <Autocomplete
                          // style={{ width: "100%" }}
                          id="outlined-basic"
                          variant="outlined"
                          size="small"
                          value={university}
                          onChange={(event, newValue) => {
                            fetchcollege(newValue);
                          }}
                          options={universitylist.map((option) => option)}
                          sx={{ width: 300 }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </div>
                    )}
 <br /> <br />
{collegelist && (
                      <div className="form-group">
                        <label className="text-muted">College Name</label>
                        <br /> <br />
                        <Autocomplete
                          // style={{ width: "100%" }}
                          id="outlined-basic"
                          variant="outlined"
                          size="small"
                          value={collegeName}
                          onChange={(event, newValue) => {
                           setCollegeName(newValue)
                          }}
                          options={collegelist.map((option) => option)}
                          sx={{ width: 300 }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </div>
                    )}

      { 
      collegeName && university &&
      <Button variant="contained"    style={{ backgroundColor:"#F1C232",color:"black",marginTop:'20px' }} onClick={getdetail}>Get Info</Button>
      }
















     
    









<Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 2,
          width: 600,
          height: 80,
        },
      }}
    >
        {
            departmentlist&&
            departmentlist.map((item)=>{
                return (
                  <Paper elevation={3}  key={item} style={{padding:'10px',backgroundColor:'#fbeec5',cursor: "pointer"}}  onClick={()=>{getmoreinfo(item,collegeName,university)}}> 
                  
                  
                 <span style={{fontWeight:'bold'}}>Department:</span> {item}<br/>
                 <span style={{fontWeight:'bold'}}>College:</span> {collegeName}<br/>
                 <span style={{fontWeight:'bold'}}>University:</span> {university}
                  
                  </Paper>
                )
              })}
        

    </Box>


    </div>
  )
}

export default Details