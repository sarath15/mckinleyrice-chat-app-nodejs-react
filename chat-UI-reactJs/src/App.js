import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import ChatPage from './components/ChatPage/ChatPage';
import LoginPage from './components/LoginPage/LoginPage';
import './App.css';

// components available in project
const Home = () => (
  <ChatPage />
);
const Login = () => (
  <LoginPage />
);

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/chat" component={Home} />
          <Route exact path="/" component={Login} />
        </div>
      </Router>
    );
  }
}

export default App;
