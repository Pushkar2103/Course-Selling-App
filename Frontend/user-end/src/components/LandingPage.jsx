import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [user, setUser] = useState(null);
  const navigator = useNavigate();

  useEffect(()=>{
    axios.get('http://localhost:3000/user/me', {
      headers: {
          Authorization: 'bearer '+localStorage.getItem('token')
      }
    }).then((res)=> {
        setUser(res.data.username)
    })
  },[]);

  if(!user)
  return (
    <div style={{
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      height:'80vh',
      width:'100%'
    }}>
      <Typography variant={'h2'}>
        Welcome to Coursera
      </Typography>
      <Typography variant={'h5'} style={{color:'gray'}}>
        Signup and Start Learning
      </Typography>
    </div>
  );

  else 
  return (
    <div style={{
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      height:'80vh',
      width:'100%'
    }}>
      <Typography variant={'h2'}>
        Explore our Courses
      </Typography>
      <div style={{
        display:'flex',
        justifyContent:'center',
        gap:20,
        marginTop:10

      }}>
        <Button variant='contained' onClick={()=>{
          navigator('/courses')
        }}>All courses</Button>

        <Button variant='contained' onClick={()=> {
          navigator('/myCourses')
        }}>Purchased courses</Button>
      </div>
    </div>
  );
};

export default LandingPage;
