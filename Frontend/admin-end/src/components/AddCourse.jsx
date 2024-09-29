import { Button, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import BASE_URL from "../utility";

function AddCourse() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [price, setPrice] = useState(0);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: 50,
      }}
    >
      <Card
        variant="outlined"
        style={{
          width: 400,
          padding: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant={"h6"}>Add new Course</Typography>
        <br />
        <TextField
          id="filled-basic"
          label="Title"
          variant="filled"
          fullWidth={true}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <br />
        <TextField
          id="filled-multiline-static"
          label="Description"
          multiline
          rows={3}
          variant="filled"
          fullWidth={true}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        />

        <br />
        <TextField
          id="filled-basic"
          label="Image link"
          variant="filled"
          fullWidth={true}
          onChange={(e) => {
            setImg(e.target.value);
          }}
        />

        <br />
        <TextField
          id="filled-basic"
          label="Price (INR)"
          variant="filled"
          fullWidth={true}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />

        <br/>

        <Button
          variant="contained"
          onClick={() => {
            if (!(title && desc)) return;
            console.log(img)
            fetch(`${BASE_URL}/admin/create-course`, {
              method: "POST",
              body: JSON.stringify({
                title: title,
                description: desc,
                imageLink: img,
                price: price
              }),
              headers: {
                "Content-type": "application/json",
                authorization: "Bearer " + localStorage.getItem("admin-token"),
              },
            }).then(() => {
              alert("Course Added!");
            });
          }}
        >
          Add Course
        </Button>
      </Card>
    </div>
  );
}

export default AddCourse;
