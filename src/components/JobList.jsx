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
        <p>No jobs added yet.</p>
      ) : (
        jobs.map((job) => (
          <div key={job.id} className="job-card">
            {editingId === job.id ? (
              <div className="edit-fields">
                <input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />

                <input
                  value={editedCompany}
                  onChange={(e) => setEditedCompany(e.target.value)}
                />
              </div>
            ) : (
              <div className="job-info">
                <h3>{job.jobTitle}</h3>
                <p className="company-name">{job.company}</p>

                {job.notes && <p className="job-notes">Notes: {job.notes}</p>}

                {job.jobLink && (
                  <a
                    className="job-link"
                    href={job.jobLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Job
                  </a>
                )}

                <p className="deadline">
                  Deadline: {job.deadline || "No deadline"}
                </p>
              </div>
            )}

            <div className="job-actions">
              <StatusBadge status={job.status} />

              <select
                className="status-select"
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
                <button
                  className="edit-button"
                  onClick={() => startEditing(job)}
                >
                  Edit
                </button>
              )}

              <button
                className="delete-button"
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete this job?")) {
                    deleteJob(job.id);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default JobList;