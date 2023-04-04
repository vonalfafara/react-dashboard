import Login from "./views/Login"
import Dashboard from "./views/Dashboard/Dashboard"
import Home from "./views/Dashboard/views/Home"

const routes = [
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "*",
    element: <Dashboard />,
    children: [
      {
        path: "/home",
        element: <Home />
      }
    ]
  }
]

export default routes