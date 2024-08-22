import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../authcontext/AuthContext";
import { Link, useNavigate } from "react-router-dom"
import axios, { AxiosError } from "axios"
import "../App.css"
import Loding from "../loading&error/Loding";
import Error from "../loading&error/Error";
import { Button, Select } from "@chakra-ui/react";

const Board = () => {
    const navigate = useNavigate();
    const {authdetails: {isloggedIn}} = useContext(AuthContext);
    const [isLoding, setLoding] = useState(false)
    const [isError, setError] = useState(false)
    const [data, setdata] = useState([])
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [status, setStatus] = useState("")
    const [last, setLast] = useState(0)

    useEffect(() => {
        getdata()
    }, [status, page])

    const getdata = async() => {
        setLoding(true)
        try {
            const resp = await axios.get(`https://kanban-board-bebk.onrender.com/board/all?page=${page}&limit=${limit}&${status}`,{
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
            alert("Board Deleted")
            
        } catch (error) {
            alert(error.response.data.message);
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
        <Select value={status} onChange={(e)=>{setStatus(e.target.value)}} >
            <option value="">All</option>
            <option value="status=TODO">TODO</option>
            <option value="status=INPROGRESS">INPROGRESS</option>
            <option value="status=DONE">DONE</option>
        </Select>
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
        <br />
        <br />
        <br />
        <Button onClick={()=>{
            setPage(page - 1)
        }} disabled={page === 1}>Previous</Button>
        <Button onClick={()=>{
            setPage(page + 1)
        }} disabled={data.length < limit}>Next</Button>
        </>
    )
}

export default Board