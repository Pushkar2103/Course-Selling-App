import { Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from "recoil";
import adminState from '/src/store/atoms/admin.js';
import BASE_URL from "../utility.js";
import adminUsername from "../store/selectors/admin.js"

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
    const setUser = useSetRecoilState(adminState);
    const user = useRecoilValue(adminUsername);

    useEffect(()=> {
        axios.get(`${BASE_URL}/admin/me`, {
            headers: {
                Authorization: 'bearer '+localStorage.getItem('admin-token')
            }
        }).then((res)=> {
            setUser({email: res.data.username})
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
            setUser({email:""})
        }}>Logout</Button>
    </div>);      
};

export default Navbar;