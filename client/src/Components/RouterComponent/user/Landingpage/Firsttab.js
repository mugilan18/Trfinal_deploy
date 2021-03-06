import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Grid } from '@material-ui/core';
import labimg from "./lab.jpg"
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Firsttab() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{background: '#F1C232'}}
      TabIndicatorProps={{  
        style: {
            // display: "none",
            backgroundColor:"white"
        },
      }} >
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Item One" {...a11yProps(0)} style={{width:"200px",color:"black"}}/>
          <Tab label="Item Two" {...a11yProps(1)} style={{width:"200px",color:"black"}}/>
          <Tab label="Item Three" {...a11yProps(2)} style={{width:"200px",color:"black"}}/>
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
  
    <Grid
    container
    direction="row"
    justifyContent="space-around"
    alignItems="center"
  >
    <Grid item>content</Grid>
    <Grid item> 
    <img
                style={{ width: "600px", height: "400px",  display: "block", marginLeft: "auto",  marginRight: "auto", width: "50%", objectFit: "contain"}}
                src={labimg}
                alt=""
              />
    </Grid>
    </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </div>
  );
}
