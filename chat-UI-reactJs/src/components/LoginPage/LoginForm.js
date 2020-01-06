import React, { Component } from 'react';
import { Panel, Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  marginTop: -100
};

const panelStyle = {
  backgroundColor: 'rgba(255,255,255,0.5)',
  border: 0,
  padding: 20,
  width: 300,
};

const buttonStyle = {
  marginBottom: 0
};

class LoginForm extends Component {

  state = {email: "user@example.com", password:"qwerty"}
  handleFormSubmit = (e) => {

    let history = useHistory();

    e.preventDefault();
    const {email, password} = this.state;
    if(!email || !password){
      alert("Email and password is required");
      return;
    }

    // post and get response
    this.postData(`${process.env.REACT_APP_WEB_API_URL}/login`, { email,password })
      .then((data) => {
       localStorage.setItem("auth", data);
      //  history.push('/chat');
      //  this.props.history.push('new_url');
      }).catch((e) => {
        console.log({e});
      });
  }

  // Example POST method implementation:
 postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    // redirect: 'follow', // manual, *follow, error
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}

  handleFieldChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  render() {
    const {email, password} = this.state;
    return (
      <div style={divStyle}>
        <Panel style={panelStyle}>
          <span className="LoginForm" id="loginForm">
            <FormGroup controlId="formEmail">
              <FormControl type="email" value={email} onChange={this.handleFieldChange} placeholder="Email Address" />
            </FormGroup>
            <FormGroup controlId="formPassword">
              <FormControl type="password" placeholder="Password" value={password} onChange={this.handleFieldChange} />
            </FormGroup>
            <FormGroup style={buttonStyle} controlId="formSubmit">
              <Button bsStyle="primary" type="submit" onClick={this.handleFormSubmit}>
                Login
              </Button>
            </FormGroup>
          </span>
        </Panel>
      </div>
    )
  }
}

export default LoginForm;
