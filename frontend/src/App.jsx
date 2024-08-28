import AllRoutes from './allroute/allrouts'
import './App.css'

function App() {

  const interval = async () => {
    const resp1 = await axios.get("https://kanban-board-bebk.onrender.com/",
    {
        headers: {
            "content-Type": "application/json",
        }
    })
    console.log(resp1.data)
}

setInterval(interval, 500000)

  return (
    <>
    <AllRoutes />
    </>
  )
}

export default App
