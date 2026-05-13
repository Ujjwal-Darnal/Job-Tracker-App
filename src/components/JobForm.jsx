import {useState}  from "react"
function JobForm({addJob}){

    const[jobTitle,setJobTitle]= useState("");

    const[company,setCompany] = useState("");

    const [status,setStatus] = useState("Applied");

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!jobTitle||!company){
            alert("Please fill all fields");
            return;
        }

        addJob({
            jobTitle,
            company,
            status,
        });
        setJobTitle("");
        setCompany("");
        setStatus("Applied");
    }


    return(
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
             onChange={(e)=> setCompany(e.target.value)}/>


             <select 
             value={status}
             onChange={(e)=>setStatus(e.target.value)}>
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
             </select>

             <button type="submit">Add Job</button>
        </form>
    )
}

export default JobForm;