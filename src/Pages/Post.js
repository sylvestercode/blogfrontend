import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

import TableContainer from '@material-ui/core/TableContainer';

import MaterialTable from 'material-table';
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
  },
}));



export default function UserList() {


 const url = "https://sheltered-meadow-18963.herokuapp.com/";
  const [data, setData] = useState([])

const columns =[


{title:"image", field:"image", render: item => <img src={url+item.image} alt="" height="100" width="100" 
 style={{ borderRadius:"50%"}}
/>},
{title:"ID", field:"_id"},
{title:"title", field:"title"},
{title:"category", field:"category"},
{title:"description", field:"description"}




]

  const classes = useStyles();


  useEffect(() => {
    UsersGet()
  }, [])
  
  const UsersGet = () => {
    fetch("https://sheltered-meadow-18963.herokuapp.com/api/post")
      .then(res => res.json())
      .then(
         res => setData(res)
        
      )
  }

  const UpdateUser = id => {
    window.location = '/update/'+id
  }

  const UserDelete = id => {
    var data = {
      'id': id
    }
    fetch('https://sheltered-meadow-18963.herokuapp.com/api/post/deletepost/'+id, {
      method: 'DELETE',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(
      (result) => {
        alert(result['message'])
        if (result['status'] === 'ok') {
          UsersGet();
        }
      }
    )
  }




  
  return (


    <div className={classes.root}>
      <Container className={classes.container} maxWidth="lg">    
        <Paper className={classes.paper}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                USERS
              </Typography>
            </Box>
            <Box>
              <Link to="/create">
                <Button variant="contained" color="primary">
                  CREATE
                </Button>
              </Link>
            </Box>
          </Box>
          <TableContainer component={Paper}>
          
          <MaterialTable

title="Blog Post List"
data={data}
columns ={columns}
options={{search: true, filtering: true }}

actions={[

  rowDat => ({

    icon:"+",
    tooltip: 'Edit Post',
    onClick: () => UpdateUser(rowDat._id)
  }),
  rowData => ({

    icon:'X',
    tooltip: 'Delete Post',
    onClick: () => UserDelete(rowData._id)
  })



]}



/>
        </TableContainer>

  
        </Paper>



      </Container>
    </div>
    
  );
}