import {  useState } from "react";
import axios from "axios";
import "../App.css"
import { Container, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom"

const Register = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [name, setname] = useState("")
    const [role, setrole] = useState("")
    const navigate = useNavigate()
    const handleSubmit = async(e)=>{
        try {
            let response =  await axios.post(`https://kanban-board-bebk.onrender.com/user/register`,{name,email,password,role})
            console.log(response.data)
            alert("User Registered")
            navigate("/login")
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
        <Container maxW="10xl">
            <h1>Register</h1>
                <div className="form">
                    <label htmlFor="">Name</label>
                    <br />
                    <input type="text" placeholder="Name" value={name} onChange={(e)=>setname(e.target.value)}/>
                    <label htmlFor="">Email</label>
                    <br />
                    <input type="text" placeholder="Email" value={email} onChange={(e)=>setemail(e.target.value)}/>
                    <br />
                    <label htmlFor="">Password</label>
                    <br />
                    <input type="password" placeholder="Password" value={password} onChange={(e)=>setpassword(e.target.value)}/>
                    <br />
                    <label htmlFor="">Role</label>
                    <br />
                    <select name="role" id="" value={role} onChange={(e)=>setrole(e.target.value)} >
                        <option value="">Select Role</option>
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                    </select>
                    <Button onClick={handleSubmit}>Register</Button>
                </div>
        </Container>
        </>
    )
}

export default Register