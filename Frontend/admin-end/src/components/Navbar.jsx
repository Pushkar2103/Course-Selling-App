import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

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
    const navigator = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(()=> {
        axios.get('http://localhost:3000/admin/me', {
            headers: {
                Authorization: 'bearer '+localStorage.getItem('admin-token')
            }
        }).then((res)=> {
            setUser(res.data.username)
        })
    }, []);

    if(!user)   
    return (
    <div>
        <Button variant="contained" style={{
            marginRight:5
        }} onClick={()=>{
            navigator('/admin/signup')
        }}>Signup</Button>

        <Button variant="contained" onClick={()=>{
            navigator('/admin/login')
        }}>Login</Button>
    </div>);

    else
    return (
    <div style={{
        display:"flex",
        alignItems:"center"
    }}>
        <Typography style={{
            marginRight:10
        }}>
            {user}
        </Typography>

        <Button variant="contained" onClick={()=> {
            localStorage.removeItem('admin-token');
            window.location = '/';
        }}>Logout</Button>
    </div>);      
};

export default Navbar;