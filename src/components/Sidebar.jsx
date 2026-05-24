function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">JobTracker</h2>

      <nav className="nav-menu">
        <a href="#dashboard">Dashboard</a>
        <a href="#add-job">Add Job</a>
        <a href="#applications">Applications</a>
        <a href="#stats">Stats</a>
      </nav>
    </aside>
  );
}

export default Sidebar;