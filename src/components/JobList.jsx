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

  <button
    className="delete-button"
    onClick={() => deleteJob(index)}
  >
    Delete
  </button>
</div>