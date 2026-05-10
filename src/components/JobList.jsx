function JobList({jobs,deleteJob}){
    return(
        <div className="job-list">
            <h2>Job Applications</h2>


{jobs.length===0?(
    <p>No Jobs added yet</p>
):(
    jobs.map((job,index)=>(
        <div  key = {index}className="job-card">
            <h3>{job.jobTitle}</h3>
            <p>{job.company}</p>

            <button className="delete-button" onClick={()=>deleteJob(index)}>Delete</button>

        </div>
    ))
)}
        </div>
    )
}
export default JobList;