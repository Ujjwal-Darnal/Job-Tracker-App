import { useEffect } from "react";
import Sidebar from "./components/Sidebar"
import StatCard from "./components/StatCard"
import "./App.css";
import JobForm from "./components/JobForm";

function App(){
  const [jobs,setJobs] = useState([]);

  const addJob = (newJob)=>{
    setJobs([...jobs,newJob]);
  }
  return(
<div className="app-layout">
  
<Sidebar/>
  
    <main className="main-content">
    <div className="page-header">
      <h1>Dashboard</h1>
    <p>Track you job applications and stay organized.</p>
    </div>
    
<section className="stats-grid">
      <StatCard title="Total Applications" value="12" description="Jobs applied so far" />
          <StatCard title="Interviews" value="3" description="Upcoming or completed" />
          <StatCard title="Offers" value="1" description="Positive responses" />
          <StatCard title="Rejected" value="4" description="Keep improving" />
</section>

<JobForm addJob={addJob}/>

    </main>
</div>
  );
}
export default App;