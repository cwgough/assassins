import React, { useState } from "react";
import '../App.css'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    // replace with call to server for auth
    console.log(username, password)
    // receive username for redirect
    // receive auth headers: store here? or in backend? how tf does this work
  }

  return (
    <div className="loginScreen">
      <Form onSubmit={handleSubmit}>

        <Form.Group >
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button className='loginButton' type="submit" disabled={!validateForm()}>
          Login
        </Button>

      </Form>
    </div>
  );

}