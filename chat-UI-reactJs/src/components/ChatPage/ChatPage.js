import React, { Component } from "react";
import "./ChatPage.css";

class ChatPage extends Component {

  state = {messagesHtml: "", message: "" }
  socket = new WebSocket(process.env.REACT_APP_WEB_SOCKET_URL);
  // initiate socket
  componentWillMount() {
    var key = "abc123";
    // open socket connection
    this.socket.onopen = () => {
      this.socket.send(
        JSON.stringify({ type: "key", name: "Sarath", data: key })
      );
    };

    // update state i=on new message
    this.socket.onmessage = (event) => {
      var response = JSON.parse(event.data);
      this.setState({messagesHtml: this.state.messagesHtml + response.name + " : " + response.data + "<br>" });
    };

    this.socket.onerror = function(err) {
      console.log(err);
    };
  }

  // function to send message
  sendMsg = e => {
    e.preventDefault();
    let {messagesHtml, message} = this.state;
    var text = message.trim();
    if (text == "") {
      return false;
    }
    messagesHtml += "You : " + text + "<br>";
    // send message
    
    this.socket.send( JSON.stringify({ type: "message", data: text }) );
    this.setState({messagesHtml, message: ""});
  };

  handleTextChange = (e) => {
    this.setState({message: e.target.value})
  }

  render() {
    const {messagesHtml, message} = this.state;
    return (
      <div className="">
        <h2>Chat Page</h2>
        <div className="messagebox" dangerouslySetInnerHTML={{
    __html: messagesHtml
}} ></div>
        <br />
        <div className="send">
            <input type="text" onChange={this.handleTextChange} value={(message)} />
            <input
              type="button"
              onClick={this.sendMsg}
              value="Send"
            />
        </div>
      </div>
    );
  }
}

export default ChatPage;
