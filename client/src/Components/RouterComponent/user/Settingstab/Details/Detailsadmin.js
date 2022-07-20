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


const Detailsadmin = () => {
    const [{ user }, dispatch] = useStateValue();
    const [modalOpen, setModalOpen] = useState(false);
     const[details,setDetails]=useState()
    const collegeName= user.collegeName
    const university=user.university
    const department=user.department
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
const getmoreinfo=(lab,college,university)=>{
  console.log(lab,college,university)
  
  fetch(`${ApiUrl}/moreInfo/getdetail/university/college/department/admin`,{
    method: "POST",
  
    body: JSON.stringify({
      university: university,
      collegeName:collegeName,
      lab:lab
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
  
   
     setDetails(json)
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
        <div>
       
       {  details &&
       <p style={{padding:'15px'}}>

<span style={{fontWeight:'bold',paddingRight:'20px'}}>Department:</span> {department} <br/>
<span style={{fontWeight:'bold',paddingRight:'20px'}}>No of Teachers :</span>{details.teachers}<br/>
<span style={{fontWeight:'bold',paddingRight:'20px'}}>No of Students :</span>{details.students}<br/>
<span style={{fontWeight:'bold',paddingRight:'20px'}}>Total no of runz created in this Department:</span>{details.listofrunz}<br/>
<span style={{fontWeight:'bold',paddingRight:'20px'}}>list of labs available :</span>
      
       { 
       
       details.list.map((item)=>{
  return (
    <li key={item}>{item}</li>
  )
})}

       </p>
      
}
<Button   style={{ backgroundColor:"#F1C232",color:"black" }} onClick={()=>setModalOpen(false)}>back</Button>
</div>
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
                  
                  
                 <span style={{fontWeight:'bold'}}>Lab:</span> {item}<br/>
                 <span style={{fontWeight:'bold'}}>College:</span> {collegeName}<br/>
                 <span style={{fontWeight:'bold'}}>University:</span> {university}
                  
                  </Paper>
                )
              })}

</Box>
    </div>
  )
}

export default Detailsadmin