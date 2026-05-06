import Sidebar from "./components/Sidebar"
import "./App.css";

function App(){
  return(
<div className="app-layout">
  
<Sidebar/>
  
    <main className="main-content">
    <h1>Dashboard</h1>
    <p>Track you job applications and stay organized.</p>
    </main>
</div>
  )
}
export default App