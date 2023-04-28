import React, { useState } from "react";
import api from "../services/api"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { navigate } from "@reach/router"

import {login} from "../services/auth"
import "./Login.css";

export default function Login() {
   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const doLogin = () => {
        api.post("/Login", {email: email, password:password})
            .then((response) => {
            login (response.data.data.token)
            navigate("/Home")
      
        }).catch((error) => {
            window.alert("Email e/ou senha incorreto(s)!")
        })

    }
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    doLogin()
}

  return (
    <div className="Grade">
      <section>
      <div className="Login">
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button margin-left="10px" margin-top="10px" block size="lg" type="submit" disabled={!validateForm()}>
            Login
          </Button>
        </Form>
      </div>
      </section>
      <footer>
        <div className="last">CONSTRUÇÃO DE SOFTWARE</div>
      </footer>
    </div>
    
  );
}