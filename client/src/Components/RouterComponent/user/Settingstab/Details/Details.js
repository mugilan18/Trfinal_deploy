import { Button, Card } from '@material-ui/core'
import React,{useEffect, useState} from 'react'
import ApiUrl from '../../../../../ServerApi'
import { useStateValue } from '../../../../../data/StateProvider' 
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useHistory, Link } from "react-router-dom";
import { Box, Paper } from '@mui/material';
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "40%",
    left: "50%",
    width: "30%",
    height: "auto",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -40%)",
    borderRadius: "2%",
  },
};


const Details = () => {
    const [{ user }, dispatch] = useStateValue();
    const [modalOpen, setModalOpen] = useState(false);
    const collegeName= user.collegeName
    const university=user.university
    const department=user.Department
    const [lablist,setLablist]=useState()
    useEffect(()=>{

      fetch(`${ApiUrl}/moreInfo/labs`, {
        method: "POST",
  
        body: JSON.stringify({
          department: department,
          collegeName:collegeName
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setLablist(json.ids);
          console.log(json);
        });
    
      
    },[])


//getmoreinfo
const getmoreinfo=(department,college,university)=>{
  console.log(department,college,university)
  
  fetch(`${ApiUrl}/moreInfo/getdetail/university/college/department/admin`,{
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
  
   
    //  setDetails(json)
    console.log(json)
    
     setModalOpen(true)
  
    }).catch((err)=>{
      console.log(err,"hhh")
    })
  
  
  
  
  }


  return (
    <div>


<Modal
        isOpen={modalOpen}
        appElement={document.getElementById('root')}
        style={customStyles}
        contentLabel="add runz Modal"
        disableBackdropClick="true"
        sx={{ overflow: 'hidden' }}
        
      >
<Button   style={{ backgroundColor:"#F1C232",color:"black" }} onClick={()=>setModalOpen(false)}>back</Button>

        </Modal>
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
            lablist&&
            lablist.map((item)=>{
                return (
                  <Paper elevation={3}  key={item} style={{padding:'10px',backgroundColor:'#fbeec5',cursor: "pointer"}} onClick={()=>{getmoreinfo(item,collegeName,university)}} > 
                  
                  
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