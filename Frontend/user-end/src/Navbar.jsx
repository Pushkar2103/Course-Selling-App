import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigator = useNavigate();
    return (
        <div style={{
            display: "flex",
            justifyContent:"space-between",
            padding:8
        }}>
            <div onClick={()=>navigator('/')}>
                <Typography variant={'h6'} style={{
                    cursor:"pointer",
                }}>Coursera</Typography>
            </div>
            <NavRight/>
        </div>
    );
}

function NavRight() {
    const [user, setUser] = useState(null);

    if(!user)   
    return (
    <div>
        <Button variant="contained" style={{
            marginRight:5
        }}>Signup</Button>

        <Button variant="contained">Login</Button>
    </div>);

    else
    return (
    <div>
        <Typography>
            {user}
        </Typography>

        <Button variant="contained">Logout</Button>
    </div>);      
};

export default Navbar;