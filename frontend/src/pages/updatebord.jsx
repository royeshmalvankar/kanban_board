import { Container, FormControl, FormLabel, Input, Button,Select } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const UpdateBord = () => {
    const [formstate, setformstate] = useState({
        task: "",
        description: "",
        status: "",
    })
    useEffect(() => {
        getdata()
    },[])
    const navigate = useNavigate()
  
    const {id} = useParams()

    const getdata = async() => {
        try {
            const resp = await axios.get(`https://kanban-board-bebk.onrender.com/board/all/${id}`,{
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })           
            setformstate({
                ...formstate,
                task: resp.data.board.task,
                description: resp.data.board.description,
                status: resp.data.board.status
            })
            
        } catch (error) {
            console.log(error);
        }
    }
    

    const ub = () => {
       try {
         axios.patch(`https://kanban-board-bebk.onrender.com/board/update/${id}`,{
             task: formstate.task,
             description: formstate.description,
             status: formstate.status
         },{ 
             headers: {  
                 "Authorization": `Bearer ${localStorage.getItem("token")}`}})
         navigate("/")

       } catch (error) {
           console.log(error);
       }

    }

    return (
        <>
        <Container maxW="10xl">
        <FormControl>
            <h1 style={{textAlign: "center", marginTop: "20px", marginBottom: "20px",fontSize: "30px"}}>Update Board</h1>
            <br />
            <FormLabel>Task</FormLabel>
            <Input placeholder="Enter Task" value={formstate.task} onChange={(e)=>{setformstate({...formstate, task: e.target.value})}} />
            <br />
            <FormLabel>Description</FormLabel>
            <Input placeholder="Enter Description" value={formstate.description} onChange={(e)=>{setformstate({...formstate, description: e.target.value})}} />
            <br />
            <FormLabel>Status</FormLabel>
            <Select placeholder="Enter Status" value={formstate.status} onChange={(e)=>{setformstate({...formstate, status: e.target.value})}}>
                <option value="TODO">TODO</option>
                <option value="INPROGRESS">INPROGRESS</option>
                <option value="DONE">DONE</option>
            </Select>
            <br />
            <Button onClick={ub}>Update</Button>
        </FormControl>
        </Container>

        </>
    )
}

export default UpdateBord