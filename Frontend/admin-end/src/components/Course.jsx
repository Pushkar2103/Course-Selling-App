import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, TextField, Typography } from "@mui/material";
import axios from "axios";
import Grid from '@mui/material/Grid';
import BASE_URL from "../utility";
import { useRecoilValue, useSetRecoilState } from "recoil";
import courseState from '../store/atoms/course.js'
import {courseCreator, courseDescription, courseDetails, courseImage, coursePrice, courseTitle, isCourseLoading} from '../store/selectors/course.js';
import CircularProgress from '@mui/material/CircularProgress';

function Course() {
    const {courseId} = useParams();
    const setCourse = useSetRecoilState(courseState);
    const course = useRecoilValue(courseDetails);
    const title = useRecoilValue(courseTitle);
    const createdBy = useRecoilValue(courseCreator);
    const price = useRecoilValue(coursePrice);
    const desc = useRecoilValue(courseDescription);
    const img = useRecoilValue(courseImage);
    const Loading = useRecoilValue(isCourseLoading);
    const navigator = useNavigate();

    function initCourse() {
      axios.get(`${BASE_URL}/admin/courses/${courseId}`, {
        headers: {
            'authorization': 'Bearer ' + localStorage.getItem('admin-token')
        }
      }).then((res)=> {
          setCourse({course: res.data, Loading: false});
      })
    }

    useEffect(()=>{ 
        initCourse();
    },[]);

    if(Loading) {
        return <center style={{
          marginTop:40
        }}>
            <CircularProgress/>
        </center>
    }

    else return <Grid container spacing={4} padding={'30px'}>
    <Grid item lg={5} md={6} sm={12} xs={12} justifyItems={"center"} alignContent={'center'}>
    <div style={{
      display: "flex",
      flexDirection:"column",
      alignItems: 'center',
      gap:20
    }}>
    <Card
        style={{
          width: 300,
          padding: 10,
          borderRadius: 10,
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

        <Button variant="contained" style={{background: '#c30010', width:100}} onClick={()=> {
          const confirmation = window.confirm("Are you sure you want to delete the course?");
          if(confirmation) {
            axios.delete(`${BASE_URL}/admin/delete-course/${courseId}`, {
              headers: {
            'authorization': 'Bearer ' + localStorage.getItem('admin-token')
            }
            }).then(()=> {
              alert("Course Deleted");
              navigator('/admin/courses');
            })
          }
        }}>
          Delete
        </Button>
      </div>
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
            const crs = {...course, title: e.target.value};
            setCourse({course: crs});
          }} />
          <br/>
          <TextField label='Update Creator' defaultValue={createdBy} fullWidth={true} onChange={(e)=>{
             const crs = {...course, createdBy: e.target.value};
             setCourse({course: crs});
          }} />
          <br/>
          <TextField label='Update Description' defaultValue={desc} fullWidth={true} onChange={(e)=>{
            const crs = {...course, description: e.target.value};
            setCourse({course: crs});
          }} />
          <br/>
          <TextField label='Update Image Link' defaultValue={img} fullWidth={true} onChange={(e)=>{
            const crs = {...course, imageLink: e.target.value};
            setCourse({course: crs});
          }} />
          <br/>
          <TextField label='Update Price' defaultValue={price} fullWidth={true} onChange={(e)=>{
            const crs = {...course, price: e.target.value};
            setCourse({course: crs});
          }} />
          <br/>
          <Button variant="contained" onClick={()=>{
            fetch(`${BASE_URL}/admin/update-course/${courseId}`, {
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
            }).then((res)=> {
              initCourse();
              alert("Course Details Updated!");
            });
          }}>Update</Button>
      </Card>
      </Grid>
    </Grid>
}

export default Course;