import { Container, FormControl, FormLabel, Select, Button } from "@chakra-ui/react"
import { Input } from "@chakra-ui/react"
import { useState } from "react"
import axios from "axios"

const CreateBord = () => {

    const [formstate, setformstate] = useState({
        task: "",
        description: "",
        status: "",
    })
  

    const cb = () => {
        axios.post("https://kanban-board-bebk.onrender.com/board/create",{
            task: formstate.task,
            description: formstate.description,
            status: formstate.status
        },{ 
            headers: {  
                "Authorization": `Bearer ${localStorage.getItem("token")}`}})
    }

    return (
        <>
        <Container maxW="10xl">
        <FormControl>
            <h1>Create Board</h1>
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
            <Button type="reset" onClick={cb}>Create</Button>
        </FormControl>
        </Container>

        </>
    )
}

export default CreateBord