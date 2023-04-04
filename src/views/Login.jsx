import { Card, Button, Form } from "react-bootstrap"

const Login = () => {
  return (
    <div className="login">
      <Card className="text-center">
        <Card.Body>
          <Card.Title>Covid19 Tracker Dashboard</Card.Title>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control type="email" placeholder="Email Address" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <div className="d-grid">
              <Button>Login</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Login