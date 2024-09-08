import { Card, containerClasses, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Courses() {
  const [courses, setCourses] = useState([]);
  
  useEffect(() => {
      axios.get("http://localhost:3000/user/courses", {
          headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
            },
        }).then((res) => {
            setCourses(res.data);
        });
    },[]);
    
    return (
        <div
      style={{
        padding: 20,
      }}
    >
      <Typography variant={"h6"}>All Courses</Typography>

      <div
        style={{
          marginTop: 20,
          display: "flex",
          flexWrap: "wrap",
          justifyContent:"center",
          gap: 10,
        }}
      >
        {courses.map((course) => {
          return <Course crs={course} />;
        })}
      </div>
    </div>
  );
}

function Course(props) {
    const navigate = useNavigate();
    return (
    <div onClick={()=>{
        navigate(`/courses/${props.crs._id}`);
    }}>
      <Card
        style={{
          width: 290,
          height: 250,
          padding: 10,
          cursor:'pointer'
        }}
      >
        <Typography
          variant={"h6"}
          style={{ textAlign: "center", fontWeight: "bold" }}
        >
          {props.crs.title}
        </Typography>
        <Typography style={{ textAlign: "center" }}>
          {props.crs.description}
        </Typography>

        <img
          style={{
            objectFit: "contain",
            width: "100%",
            height: "auto",
          }}
          src={props.crs.image}
        />
        
        <Typography style={{ marginLeft:30 }}>
          Rs.{props.crs.price}
        </Typography>
      </Card>
    </div>
  );
}

export default Courses;