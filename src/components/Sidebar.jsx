function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">Job Application Tracker</h2>

      <nav className="nav-menu">
        <a href="#dashboard">Dashboard</a>
        <a href="#add-job">Add Application</a>
        <a href="#applications">My Applications</a>
        <a href="#stats">Stats</a>
      </nav>
    </aside>
  );
}

export default Sidebar;