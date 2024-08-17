import { BrowserRouter as Router } from "react-router-dom"
import Sidebar from "./components/Sidebar"
const App = () => {
  return (
    <div className="w-full h-screen">
      <Router>
        <div className="w-[40%]">
          <Sidebar />
        </div>
      </Router>
    </div>
  )
}

export default App
