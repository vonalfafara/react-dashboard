import Sidebar from "../../components/Sidebar"
import { Routes, Route } from "react-router-dom"
import routes from "../../router"
import Dropdown from 'react-bootstrap/Dropdown';
const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <div className="main-navbar">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Von Alfafara
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </div>
        <Routes>
          {routes[1].children.map((route, index) => {
            return <Route key={index} path={route.path} element={route.element} exact />
          })}
        </Routes>
      </div>
    </div>
  )
}

export default Dashboard