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

    const response = await fetch(
      "https://ptxbilht2ac6s4bg4ozs7bekq40fpqym.lambda-url.ap-south-1.on.aws/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input, history }),
      }
    );

    const reader = response?.body?.getReader();

    if (!reader) return;

    const decoder = new TextDecoder("utf-8");

    let done = false;

    let chunkedMessage = "";
    let messageIndex = messages.length;

    while (!done) {
      const { value, done: readerDone } = await reader?.read();
      done = readerDone;
      const chunk = decoder.decode(value, { stream: true });
      chunkedMessage += chunk;
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[messageIndex] = {
          ...updatedMessages[messageIndex],
          bot: chunkedMessage,
        };
        return updatedMessages;
      });
    }

    setInput("");
  };

  return (
    <div>
      <h1>Chatbot</h1>
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
          style={{ padding: "10px", width: "80%" }}
        />
        <button type="submit" style={{ padding: "10px" }}>
          Send
        </button>
      </form>
    </div>
  );
}
