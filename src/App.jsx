import { useState,useEffect } from "react";
import Sidebar from "./components/Sidebar"
import StatCard from "./components/StatCard"
import "./App.css";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";

function App(){
  const [jobs,setJobs] = useState(()=>{
   
    const savedJobs = localStorage.getItem("jobs");
    return savedJobs? JSON.parse(savedJobs):[];
  });

  const [searchJob,setSearchJob] = useState(""
  );

  const [statusFilter,setStatusFilter]=useState("All");

  // =====function to add job======//
  const addJob = (newJob)=>{
    setJobs([...jobs,newJob]);
  }

  // ========= function to delete job =======//
  const deleteJob = (indexToDelete) =>{
    const updatedJobs = jobs.filter((_,index)=>
    index !== indexToDelete);
    setJobs(updatedJobs);
  }

  
  //============= save to local Storage =======//
  useEffect(()=>{
    localStorage.setItem("jobs",JSON.stringify(jobs));
  },[jobs])


  //========== function to filtered Job=====//
const filteredJobs = jobs.filter((job) => {
  const matchesSearch =
    job.jobTitle.toLowerCase().includes(searchJob.toLowerCase()) ||
    job.company.toLowerCase().includes(searchJob.toLowerCase());

  const matchesStatus =
    statusFilter === "All" || job.status === statusFilter;

  return matchesSearch && matchesStatus;
});


const totalApplications = jobs.length;
const interviews = jobs.filter(
  (job)=>job.status==="Interview"
).length;

const offers = jobs.filter(
  (job) => job.status === "Offer"
).length;

const rejected = jobs.filter((job)=>job.status === "Rejected").length;

// ================= update job statues directly from the list========//

const updateJobStatus = (indexToUpdate,newStatus) =>{
  const updatedJobs = jobs.map((job,index)=>{
    if(index === indexToUpdate){
      return {
        ...job,
        status:newStatus,
      };
    }
    return job;
  });
  setJobs(updatedJobs);
};
  return(
<div className="app-layout">
  
<Sidebar/>
  
    <main className="main-content">
    <div className="page-header">
      <h1>Dashboard</h1>
    <p>Track you job applications and stay organized.</p>
    </div>
    
<section className="stats-grid">
      <StatCard title="Total Applications" value={totalApplications}description="Jobs applied so far" />
          <StatCard title="Interviews" value={interviews}description="Upcoming or completed" />
          <StatCard title="Offers" value={offers} description="Positive responses" />
          <StatCard title="Rejected" value={rejected}
           description="Keep improving" />
</section>

<JobForm addJob={addJob}/>

<div className="search-bar">
  <input 
type="text"
placeholder="Search Jobs..."
value={searchJob}
onChange = {(e)=>setSearchJob(e.target.value)} />
</div>

<select 
value={statusFilter}
onChange = {(e)=>setStatusFilter(e.target.value)}
>
    <option value="All">All</option>
  <option value="Applied">Applied</option>
  <option value="Interview">Interview</option>
  <option value="Offer">Offer</option>
  <option value="Rejected">Rejected</option>
</select>

<JobList jobs = {filteredJobs} deleteJob = {deleteJob}
updateJobStatus = {updateJobStatus}/>

    </main>
</div>
  );
}
export default App;