import { Container } from "@chakra-ui/react"
import { Link as ChakraLink } from "@chakra-ui/react"
import { Link as Reactrouterlink } from "react-router-dom"
import { useContext } from "react"
import {AuthContext} from "../authcontext/AuthContext"
import Logout from "./logout"

const Navbar = () => {
    const {authdetails} = useContext(AuthContext)
    const {isloggedIn} = authdetails
    return (
        <>
        <div className="navbar">
            <h1 >Kanban Board</h1>
        </div>
        <Container maxW="10xl" width={"100%"} border={"1px solid black"} display={"flex"} justifyContent={"space-evenly"}>
            <ChakraLink  as={Reactrouterlink} to={"/"}>Home</ChakraLink> 
            <ChakraLink as={Reactrouterlink} to={"/create"}>Create</ChakraLink>
            {isloggedIn &&  <Logout />}
            {!isloggedIn && <ChakraLink as={Reactrouterlink} to={"/login"}>Login</ChakraLink>}
            {!isloggedIn && <ChakraLink as={Reactrouterlink} to={"/register"}>Register</ChakraLink>}
        </Container>
        </>
    )   
}

export default Navbar