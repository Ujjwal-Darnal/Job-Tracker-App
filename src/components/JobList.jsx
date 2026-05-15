import { useState } from "react";
function JobList({ jobs, deleteJob, updateJobStatus, updateJob }) {

  const [editingIndex, setEditingIndex] = useState(null);

  const [editedTitle, setEditedTitle] = useState("");

  const [editedCompany, setEditedCompany] = useState("");

  const startEditing = (job, index) => {
    setEditingIndex(index);
    setEditedTitle(job.jobTitle);
    setEditedCompany(job.company)
  };

  const saveEdit = (job, index) => {
    updateJob(index, {
      ...job,
      jobTitle: editedTitle,
      company: editedCompany,
    });
    setEditingIndex(null);
  }


  return (
    <div className="job-list">
      <h2>Job Applications</h2>

      {jobs.length === 0 ? (
        <p>No Jobs added yet</p>
      ) : (
        jobs.map((job, index) => (
          <div key={index} className="job-card">

            {editingIndex === index ? (
              <>
                <input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)} />
                <input
                  value={editedCompany}
                  onChange={(e) => setEditedCompany(e.target.value)}
                />
              </>
            ) : (
              <>
                <h3>{job.jobTitle}</h3>
                <p>{job.company}</p>
              </>
            )}
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

            {editingIndex === index ? (
              <button
                className="edit-button"
                onClick={() => saveEdit(job, index)}
              >
                Save
              </button>
            ) : (
              <button
                className="edit-button"
                onClick={() => startEditing(job, index)}
              >
                Edit
              </button>
            )}


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