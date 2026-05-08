import {useState}  from "react"
function JobForm(){

    const[jobTitle,setJobTitle]= useState("");

    const[company,setCompany] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();
        setJobTitle("");
        setCompany("");
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

             <button type="submit">Add Job</button>
        </form>
    )
}

export default JobForm;