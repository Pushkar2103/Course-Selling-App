import { Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../utility";

function Courses() {
  const [courses, setCourses] = useState([]);
  
  useEffect(() => {
      axios.get(`${BASE_URL}/admin/courses`, {
          headers: {
              authorization: "Bearer " + localStorage.getItem("admin-token"),
            },
        }).then((res) => {
            setCourses(res.data);
        })
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
        navigate(`/admin/courses/${props.crs._id}`);
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
            height: "70%",
          }}
          src={props.crs.imageLink}
        />
        
        <Typography style={{ marginLeft:30 }}>
          Rs.{props.crs.price}
        </Typography>
      </Card>
    </div>
  );
}

export default Courses;