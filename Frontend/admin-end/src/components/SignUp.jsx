import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import { useState } from "react";

function SignUp() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [vis, setVis] = useState("hidden");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch('http://localhost:3000/admin/signup', {
      method: 'POST',
      body: JSON.stringify({
        'username': user,
        'password': pass
      }),
      headers: {
        'Content-type': "application/json"
      }
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => localStorage.setItem('admin-token', data.token));
        window.location = '/admin';
      } else {
        setVis('visible');
        setTimeout(() => setVis('hidden'), 3000);
      }
    });
  };

  return (
    <div
      style={{
        paddingTop: 80,
      }}
    >
      <div
        style={{
          paddingBottom: 50,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant={"h6"}>
          Welcome to Coursera. SignUp below.
        </Typography>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          position: 'relative'
        }}
      >
        <Card
          style={{
            width: 350,
            padding: 20,
          }}
        >
          <div style={{
            color: 'red',
            position: 'absolute',
            visibility: vis
          }}>
            Username already exists!
          </div>
          <br />

          <form onSubmit={handleSubmit}>
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              fullWidth={true}
              onChange={(e) => setUser(e.target.value)}
            />
            <br />
            <br />
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              fullWidth={true}
              onChange={(e) => setPass(e.target.value)}
            />
            <br />
            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button variant="contained" type="submit">
                SignUp
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default SignUp;
