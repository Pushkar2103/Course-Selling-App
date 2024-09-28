import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, collapseClasses, Grid2, preReleaseLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import Grid from '@mui/material/Grid';

function Course() {
    const {courseId} = useParams();
    const [course, setCourse] = useState(false);
    const [title, setTitle] = useState('');
    const [createdBy, setCreatedBy] = useState('');
    const [price, setPrice] = useState(0);
    const [desc, setDesc] = useState('');
    const [img, setImg] = useState('');

    useEffect(()=>{ 
        axios.get(`http://localhost:3000/admin/courses/${courseId}`, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('admin-token')
            }
        }).then((res)=> {
            setCourse(true);
            setTitle(res.data.title);
            setPrice(res.data.price);
            setDesc(res.data.description);
            setImg(res.data.imageLink);
            setCreatedBy(res.data.createdBy);
        })
    },[]);

    if(!course) {
        return <Typography style={{
            padding:50
        }}>
            Loading...
        </Typography>
    }

    else return <Grid container spacing={4} padding={'30px'}>
    <Grid item lg={5} md={6} sm={12} xs={12} justifyItems={"center"} alignContent={'center'}>
    <Card
        style={{
          width: 300,
          height: 250,
          padding: 10,
          margin: 'auto'
        }}
      >
        <Typography
          variant={"h6"}
          style={{ textAlign: "center", fontWeight: "bold" }}
        >
          {title}
        </Typography>

        <Typography style={{ textAlign: "center" }}>
          Created By: {createdBy}
        </Typography>

        <Typography style={{ textAlign: "center" }}>
          {desc}
        </Typography>

        <img
          style={{
            objectFit: "contain",
            width: "100%",
            height: "auto",
          }}
          src={img}
        />

        <Typography style={{ textAlign: "center" }}>
          Rs.{price}
        </Typography>
      </Card>
    </Grid>

      <Grid item lg={5} md={6} sm={12} xs={12} justifyItems={"center"} alignContent={'center'}>
      <Card style={{
        width:350,
        padding:10,
        display:"flex",
        flexDirection:"column",
        alignItems:'center',
        flexWrap:"wrap",
        margin:'auto'
      }}>
            <Typography variant={'h6'}>
                Update course details
            </Typography>

            <br/>

          <TextField label='Update Title' defaultValue={title} fullWidth={true} onChange={(e)=>{
            setTitle(e.target.value);
          }} />
          <br/>
          <TextField label='Update Creator' defaultValue={createdBy} fullWidth={true} onChange={(e)=>{
            setCreatedBy(e.target.value);
          }} />
          <br/>
          <TextField label='Update Description' defaultValue={desc} fullWidth={true} onChange={(e)=>{
            setDesc(e.target.value);
          }} />
          <br/>
          <TextField label='Update Image Link' defaultValue={img} fullWidth={true} onChange={(e)=>{
            setImg(e.target.value);
          }} />
          <br/>
          <TextField label='Update Price' defaultValue={price} fullWidth={true} onChange={(e)=>{
            setPrice(e.target.value);
          }} />
          <br/>
          <Button variant="contained" onClick={()=>{
            fetch(`http://localhost:3000/admin/update-course/${courseId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    title: title,
                    description: desc,
                    imageLink: img,
                    createdBy:createdBy,
                    price:price
                }),
                headers:{
                    'Content-type': 'application/json',
                    'authorization': 'Bearer '+localStorage.getItem('admin-token')
                }
            }).then((res)=>{
                setCourse(2);
            })
          }}>Submit</Button>
      </Card>
      </Grid>
    </Grid>
}

export default Course;