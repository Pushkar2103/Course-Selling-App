import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, collapseClasses, TextField, Typography } from "@mui/material";
import axios from "axios";

function Course() {
    const {courseId} = useParams();
    const [course, setCourse] = useState(null);
    const [purchased, setPurchased] = useState(false);

    useEffect(()=>{ 
        axios.get(`http://localhost:3000/user/courses/${courseId}`, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('token'),
                "Content-Type": 'application/json'
            }
        }).then((res)=> {
            setCourse(res.data.course);
            setPurchased(res.data.purchased);
        })
    },[]);

    if(!course) {
        return <Typography style={{
            padding:50
        }}>
            Loading...
        </Typography>
    }

    else return <div style={{
        display:"flex",
        padding:50,
        justifyContent:"space-around"
    }}>
    <Card
        style={{
          width: 500,
          height: 450,
          padding: 10
        }}
      >
        <Typography
          variant={"h6"}
          style={{ textAlign: "center", fontWeight: "bold" }}
        >
          {course.title}
        </Typography>
        
        <Typography style={{ textAlign: "center" }}>
          Created By: {course.createdBy}
        </Typography>
        
        <Typography style={{ textAlign: "center" }}>
          {course.description}
        </Typography>
        <img
          style={{
            objectFit: "contain",
            width: "100%",
            height: "auto",
          }}
          src={course.image}
        />

        <Typography style={{ textAlign: "center" }}>
          Rs.{course.price}
        </Typography>

        <div style={{
            display:"flex",
            justifyContent:"center"
        }}>
            <Purchase purchased={purchased} courseId={courseId} setPurchased={setPurchased} />
        </div>
      </Card>
    </div>
}

const Purchase = ({purchased, courseId, setPurchased})=> {

    if(!purchased) 
    return (
        <Button variant='contained' onClick={()=> {
          fetch(`http://localhost:3000/user/course/${courseId}`, {
            method: 'PUT',
            headers: {
              Authorization: 'bearer ' + localStorage.getItem('token'),
              "Content-Type": 'application/json'
            }
          }).then((res)=> {
            if(res.status === 200)
            setPurchased(true)
          })
        }} >
            Buy Course
        </Button>
    );

    else
    return (
        <div>
          <Typography variant={'h6'} style={{
              fontWeight:"bold",
              color:"gray"
          }}>
              Purchased
          </Typography>
        </div>
    )
};

export default Course;