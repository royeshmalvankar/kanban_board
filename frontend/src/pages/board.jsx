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
            setLast(Math.ceil(resp.data.total/limit))
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
        <h1 style={{textAlign: "center", marginTop: "20px", marginBottom: "20px",fontSize: "30px"}}>Board</h1>
        <br />
        <Select value={status} onChange={(e)=>{setStatus(e.target.value)}} boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" width={"50%"} margin={"auto"} >
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
                            <h1><span>Task:</span> {ele.task}</h1>
                            <h1><span>Description:</span> {ele.description}</h1>
                            <h1><span>Status:</span> {ele.status}</h1>
                            <h1><span>User Id:</span> {ele.userId}</h1>
                            <Button onClick={()=>deleteBoard(ele._id)} colorScheme="red" margin={"10px"} size="md">Delete</Button>
                            <Button margin={"10px"} size="md"  colorScheme="blue"><Link to={`/updatebord/${ele._id}`} >Update</Link></Button>
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
        }} isDisabled={page === 1} margin={"10px"}>Previous</Button>
        <Button>{page}</Button>
        <Button onClick={()=>{
            setPage(page + 1)
        }} isDisabled={data.length < limit} margin={"10px"} paddingLeft={"30px"} paddingRight={"30px"}>Next</Button>
        <br />
        <br />
        {data.length < 10 ? <Button onClick={()=>setPage(1)}>First Page</Button>: <Button onClick={()=>setPage(last)} margin={"10px"} >Last Page</Button>}
        </>
    )
}

export default Board