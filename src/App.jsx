import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import StatCard from "./components/StatCard";
import "./App.css";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";

function App() {
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem("jobs");
    return savedJobs ? JSON.parse(savedJobs) : [];
  });

  const [searchJob, setSearchJob] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [sortOrder, setSortOrder] = useState("latest");

  const [darkMode, setDarkMode] = useState(()=>{
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme === "ture";
  })

  // =====function to add job======//
  const addJob = (newJob) => {
    setJobs([...jobs, newJob]);
  };

  // ========= function to delete job =======//
  const deleteJob = (idToDelete) => {
    const updatedJobs = jobs.filter((job) => job.id !== idToDelete);
    setJobs(updatedJobs);
  };

  //============= save to local Storage =======//
  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  //====== save dark theme even after refresh====//
  useEffect(()=>{
    localStorage.setItem("darkMode",darkMode);
  },[darkMode]);

  
  //========== function to filtered Job=====//
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.jobTitle.toLowerCase().includes(searchJob.toLowerCase()) ||
      job.company.toLowerCase().includes(searchJob.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || job.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortOrder === "latest") {
      return new Date(b.deadline) - new Date(a.deadline);
    }
    return new Date(a.deadline) - new Date(b.deadline);
  });

  const totalApplications = jobs.length;
  const interviews = jobs.filter((job) => job.status === "Interview").length;

  const offers = jobs.filter((job) => job.status === "Offer").length;

  const rejected = jobs.filter((job) => job.status === "Rejected").length;

  // ================= update job statues directly from the list========//
  
  const updateJobStatus = (idToUpdate, newStatus) => {
    const updatedJobs = jobs.map((job) => {
      if (job.id === idToUpdate) {
        return {
          ...job,
          status: newStatus,
        };
      }
      return job;
    });
    setJobs(updatedJobs);
  };

  //================== update job ===========//
 
  const updateJob = (idToUpdate, updatedJob) => {
    const updatedJobs = jobs.map((job) => {
      if (job.id === idToUpdate) {
        return updatedJob;
      }
      return job;
    });
    setJobs(updatedJobs);
  };

  return (
    <div className={darkMode ? "app-layout dark" : "app-layout"}>
      <Sidebar />

      <main className="main-content">
        <button
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)} 
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <div className="page-header">
          <h1>Dashboard</h1>
          <p>Track your job applications and stay organized.</p> 
        </div>

        <section className="stats-grid">
          <StatCard
            title="Total Applications"
            value={totalApplications}
            description="Jobs applied so far"
          />
          <StatCard
            title="Interviews"
            value={interviews}
            description="Upcoming or completed"
          />
          <StatCard title="Offers" value={offers} description="Positive responses" />
          <StatCard
            title="Rejected"
            value={rejected}
            description="Keep improving"
          />
        </section>

        <JobForm addJob={addJob} />

        <div className="job-controls">
          <input
            type="text"
            placeholder="Search Jobs..."
            value={searchJob}
            onChange={(e) => setSearchJob(e.target.value)}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="latest">Latest Deadline</option>
            <option value="oldest">Oldest Deadline</option>
          </select>
        </div>

        <JobList
          jobs={sortedJobs}
          deleteJob={deleteJob}
          updateJobStatus={updateJobStatus}
          updateJob={updateJob}
        />
      </main>
    </div>
  );
}

export default App;