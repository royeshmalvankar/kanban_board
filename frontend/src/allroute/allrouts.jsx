import { Container } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import Board from "../pages/board"
import CreateBord from "../pages/createbord"
import Login from "../pages/login"
import Logout from "../pages/logout"
import Register from "../pages/register"
import Navbar from "../pages/navbar"
import PrivateRoute from "../privateroute/privateroute"
import UpdateBord from "../pages/updatebord"

const AllRoutes = () => {

    return (
        <Container maxW="10xl">
            <Navbar />
            <Routes>
                <Route path="/" element={<PrivateRoute><Board /></PrivateRoute>} />
                <Route path="/create" element={<PrivateRoute><CreateBord /></PrivateRoute>} />
                <Route path="/updatebord/:id" element={<PrivateRoute><UpdateBord /></PrivateRoute>} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Container>
    )
}

export default AllRoutes