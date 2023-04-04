import Button from 'react-bootstrap/Button';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h3>COVID19 Tracker</h3>
      </div>
      <div className="sidebar-content">
        <div className="d-grid gap-2">
          <Button variant="primary">
            Block level button
          </Button>
          <Button variant="secondary">
            Block level button
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar