function JobList({ jobs, deleteJob, updateJobStatus }) {
  return (
    <div className="job-list">
      <h2>Job Applications</h2>

      {jobs.length === 0 ? (
        <p>No Jobs added yet</p>
      ) : (
        jobs.map((job, index) => (
          <div key={index} className="job-card">
            <h3>{job.jobTitle}</h3>
            <p>{job.company}</p>

            <select
              value={job.status}
              onChange={(e) =>
                updateJobStatus(index, e.target.value)
              }
            >
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>

            <button className="edit-button">
                Edit
            </button>

            <button
              className="delete-button"
              onClick={() => deleteJob(index)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default JobList;