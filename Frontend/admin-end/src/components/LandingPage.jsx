import React, { useEffect} from 'react';
import { Typography, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BASE_URL from "../utility.js"
import adminUsername from '../store/selectors/admin.js';
import { useRecoilValue } from 'recoil';

const LandingPage = () => {
  const navigator = useNavigate();
  const user = useRecoilValue(adminUsername);

  useEffect(()=>{
    axios.get(`${BASE_URL}/admin/me`, {
      headers: {
          Authorization: 'bearer '+localStorage.getItem('admin-token')
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
      <Typography variant={'h2'} textAlign={'center'}>
        Welcome to Coursera
      </Typography>
      <Typography variant={'h5'} style={{color:'gray'}}>
        Login to create courses
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
      <Typography variant={'h2'} textAlign={'center'}>
        Create courses to share knowledge
      </Typography>
      <div style={{
        display:'flex',
        justifyContent:'center',
        gap:20,
        marginTop:10

      }}>
        <Button variant='contained' onClick={()=>{
          navigator('/admin/courses')
        }}>All courses</Button>

        <Button variant='contained' onClick={()=> {
          navigator('/admin/addCourse')
        }}>Create courses</Button>
      </div>
    </div>
  );
};

export default LandingPage;
