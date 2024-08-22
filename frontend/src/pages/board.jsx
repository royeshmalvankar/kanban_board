import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../authcontext/AuthContext";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import "../App.css"
import Loding from "../loading&error/Loding";
import Error from "../loading&error/Error";
import { Button } from "@chakra-ui/react";

const Board = () => {
    const navigate = useNavigate();
    const {authdetails: {isloggedIn}} = useContext(AuthContext);
    const [isLoding, setLoding] = useState(false)
    const [isError, setError] = useState(false)
    const [data, setdata] = useState([])

    useEffect(() => {
        getdata()
    }, [])

    const getdata = async() => {
        setLoding(true)
        try {
            const resp = await axios.get("https://kanban-board-bebk.onrender.com/board/all",{
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })           
            setdata(resp.data.board)
            setLoding(false)
        } catch (error) {
            setError(true)
        }
    }

    const deleteBoard = async(id) => {
        try {
            await axios.delete(`https://kanban-board-bebk.onrender.com/board/delete/${id}`,{
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            getdata()
        } catch (error) {
            console.log(error);
        }
    }

    if(isLoding)
    {
        return(
            <Loding/>
        )
    }

    if(isError)
    {
        return(
            <Error/>
        )
    }

    return (
        <>
        <h1>Board</h1>
        <br />
        <br />
        <br />
        <br />
        <div className="container">
            {
                data.map((ele)=>{
                    return(
                        <div key={ele._id} className="board">
                            <h1>Task: {ele.task}</h1>
                            <h1>Description: {ele.description}</h1>
                            <h1>Status: {ele.status}</h1>
                            <h1>UserID: {ele.userId}</h1>
                            <Button onClick={()=>deleteBoard(ele._id)}>Delete</Button>
                            <Button><Link to={`/updatebord/${ele._id}`}>Update</Link></Button>
                        </div>
                    )
                })
            }    
        </div>
        </>
    )
}

export default Board