import { useState } from "react";

function JobForm({ addJob }) {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("Applied");
  const [deadline, setDeadline] = useState("");
  const[jobLink,setJobLink] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!jobTitle || !company) {
      alert("Please fill all fields");
      return;
    }

    addJob({
      jobTitle,
      company,
      status,
      deadline,
      jobLink
    });

    setJobTitle("");
    setCompany("");
    setStatus("Applied");
    setDeadline("");
    setJobLink("");
  };

  return (
    <form onSubmit={handleSubmit} className="job-form">
      <h2>Add Job</h2>

      <input
        type="text"
        placeholder="Job Title"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Company Name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <input 
      type="url"
      placeholder="Job Application Link"
      value={jobLink}
      onChange = {(e)=>setJobLink(e.target.value)}
      />

      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>

      <button type="submit">Add Job</button>
    </form>
  );
}

export default JobForm;