import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "./css/style.css";

const App = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const socketRef = useRef();

  useEffect(() => {
    const out = document.getElementById("output");
    out.scrollIntoView(0, out.scrollHeight);

    socketRef.current = io.connect("http://localhost:4000");
    socketRef.current.on("chat", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
    return () => socketRef.current.disconnect();
  }, [chat]);

  const onMessageSubmit = (e) => {
    e.preventDefault();
    if (name.length > 2 && message.length > 4) {
      socketRef.current.emit("chat", { name, message });
      setMessage("");
    } else {
      alert("Adınız min: 2, Message: 4 karakterden oluşmalıdır!");
    }
  };

  const renderChat = () => {
    return chat.map((user, index) =>
      user.name === name ? (
        <div className="flex">
          <p key={index} className="self">
            {user.message}
          </p>
        </div>
      ) : (
        <p key={index}>{user.message}</p>
      )
    );
  };

  return (
    <div className="chat-wrap">
      <div className="justify-content-between">
        <i class="fas fa-arrow-left"></i>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Ad"
        />
        <div className="person"></div>
      </div>

      <div className="chat-window">
        <div id="output">{renderChat()}</div>
      </div>
      <form onSubmit={onMessageSubmit}>
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="Mesaj"
        />
        <button>
          <i class="fas fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
};

export default App;
