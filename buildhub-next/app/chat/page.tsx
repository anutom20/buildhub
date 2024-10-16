// pages/index.js
"use client";
import { useState } from "react";

interface MessagePair {
  user: string;
  bot: string;
}

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<MessagePair[]>([]);

  const sendMessage = async (e: any) => {
    e.preventDefault();
    if (!input) return;

    let history = [];

    for (const message of messages) {
      history.push({ role: "user", parts: [{ text: message.user }] });
      history.push({ role: "model", parts: [{ text: message.bot }] });
    }

    setMessages((prev) => [...prev, { user: input, bot: "" }]);

    try {
      const response = await fetch("/api/stream", {
        method: "POST",
        body: JSON.stringify({ history, prompt: input }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const reader = response?.body?.getReader();

      if (!reader) return;

      const decoder = new TextDecoder("utf-8");

      let chunkedMessage = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        let messageIndex = messages.length;
        try {
          chunkedMessage += decoder.decode(value);

          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            updatedMessages[messageIndex] = {
              ...updatedMessages[messageIndex],
              bot: chunkedMessage,
            };
            return updatedMessages;
          });
        } catch (e) {
          console.log(e);
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setInput("");
    }
  };

  return (
    <div>
      <h1>Chatbot</h1>
      <h2>
        Hey there , i am here to help you identify the need , the 1st step ,
        start by telling me your name
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div
              style={{
                flex: 1,
                textAlign: "left",
                border: "1px solid #ccc",
                padding: "10px",
              }}
            >
              <strong>User:</strong> {msg.user}
            </div>
            <div
              style={{
                flex: 1,
                textAlign: "right",
                border: "1px solid #ccc",
                padding: "10px",
              }}
            >
              <strong>Bot:</strong> {msg.bot}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} style={{ marginTop: "20px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{ padding: "10px", width: "80%", color: "black" }}
        />
        <button type="submit" style={{ padding: "10px" }}>
          Send
        </button>
      </form>
    </div>
  );
}
