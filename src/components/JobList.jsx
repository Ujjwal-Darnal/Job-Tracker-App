import { useState } from "react";
import StatusBadge from "./StatusBadge";

function JobList({ jobs, deleteJob, updateJobStatus, updateJob }) {
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedCompany, setEditedCompany] = useState("");

  const startEditing = (job) => {
    setEditingId(job.id);
    setEditedTitle(job.jobTitle);
    setEditedCompany(job.company);
  };

  const saveEdit = (job) => {
    updateJob(job.id, {
      ...job,
      jobTitle: editedTitle,
      company: editedCompany,
    });

    setEditingId(null);
  };

  return (
    <div className="job-list">
      <h2>Job Applications</h2>

      {jobs.length === 0 ? (
        <p>No Jobs added yet</p>
      ) : (
        jobs.map((job) => (
          <div key={job.id} className="job-card">
            {editingId === job.id ? (
              <>
                <input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />

                <input
                  value={editedCompany}
                  onChange={(e) => setEditedCompany(e.target.value)}
                />
              </>
            ) : (
              <>
                <h3>{job.jobTitle}</h3>
                <p>{job.company}</p>
                {job.notes && <p>Notes: {job.notes}</p>}

                {job.jobLink && (
                  <a href={job.jobLink} target="_blank" rel="noreferrer">
                    View Job
                  </a>
                )}

                <p>Deadline: {job.deadline || "No deadline"}</p>
              </>
            )}
            <StatusBadge status={job.status}/>

            <select
              value={job.status}
              onChange={(e) => updateJobStatus(job.id, e.target.value)}
            >
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>

            {editingId === job.id ? (
              <button className="edit-button" onClick={() => saveEdit(job)}>
                Save
              </button>
            ) : (
              <button className="edit-button" onClick={() => startEditing(job)}>
                Edit
              </button>
            )}

            <button
              className="delete-button"
              onClick={() => deleteJob(job.id)}
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