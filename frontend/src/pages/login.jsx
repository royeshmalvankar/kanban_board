import { Button, Container, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react"
import { useContext } from "react"
import { AuthContext } from "../authcontext/AuthContext"
import axios from "axios"
import Register from "./register"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const navigate = useNavigate()
    const {login, userauth, setUserauth} = useContext(AuthContext)
    const Getlogin = async() => {
        try {
            const resp = await axios.post("https://kanban-board-bebk.onrender.com/user/login"
                , {
                email: userauth.email,
                password: userauth.password
            })
            if(resp.data.token)
            {
                login(resp.data.token);
                localStorage.setItem("token",resp.data.token)
                localStorage.setItem("isloggedIn",true)
                navigate("/")
            }
            else
            {
                alert("Invalid Credentials")
            }

            
        } catch (error) {
            console.log(error);
        }
        
    }
        let iserroremail = userauth.email === ""
        let iserrorpassword = userauth.password === ""


    return (
        <>
        <Container maxW="10xl" >
            <FormControl isInvalid={iserroremail || iserrorpassword}>
            <h1 style={{textAlign: "center", marginTop: "20px", marginBottom: "20px",fontSize: "30px"}}>Login</h1>
            <br />
                <FormLabel>Email:</FormLabel>
                    <Input placeholder='Enter Email' type="email" id="em" value={userauth.email}  onChange={(e)=>{setUserauth({...userauth, email: e.target.value})}}/>
                    {iserroremail ?<FormErrorMessage> Email is required</FormErrorMessage> : null}
                    <br />
                    <br />
                <FormLabel>Password:</FormLabel>
                    <Input placeholder='Enter Password' type="password" id="pa" value={userauth.password} onChange={(e)=>{setUserauth({...userauth, password: e.target.value})}}/>
                    {iserrorpassword ?<FormErrorMessage> Password is required</FormErrorMessage> : null}
                    <br />
                    <br />
                <Button onClick={Getlogin}>Login</Button>
            </FormControl>
                <br />
                <br />
                <h1>Don't have an account? <Button onClick={()=>navigate("/register")}>Register</Button></h1>
        </Container>
        </>
    )
}

export default Login