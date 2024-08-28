import AllRoutes from './allroute/allrouts'
import './App.css'
import Login from './pages/login'

function App() {

  const interval = async () => {
    const resp1 = await axios.get("https://kanban-board-bebk.onrender.com/")
    console.log(resp1.data)
}

setInterval(interval, 840000)

  return (
    <>
    <AllRoutes />
    </>
  )
}

export default App
