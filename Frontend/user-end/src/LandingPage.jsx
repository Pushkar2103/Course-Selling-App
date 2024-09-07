import React from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';

const LandingPage = () => {
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
};

export default LandingPage;
