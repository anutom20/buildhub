import { GoogleGenerativeAI } from "@google/generative-ai";

export const geminiStream = awslambda.streamifyResponse(
  async (event, responseStream, context) => {
    const httpResponseMetadata = {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html",
      },
    };

    const requestBody = JSON.parse(event.body);

    responseStream = awslambda.HttpResponseStream.from(
      responseStream,
      httpResponseMetadata
    );

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Hello, I have 2 dogs in my house." }],
        },
        {
          role: "model",
          parts: [{ text: "Great to meet you. What would you like to know?" }],
        },
      ],
    });

    const firstMessage = "How many paws are in my house?";
    const result1 = await chat.sendMessageStream(firstMessage);

    for await (const chunk of result1.stream) {
      responseStream.write(`<p>${chunk.text()}</p>`);
    }

    // Send a follow-up message
    const secondMessage = "What should I feed my dogs?";
    const result2 = await chat.sendMessageStream(secondMessage);

    for await (const chunk of result2.stream) {
      responseStream.write(`<p>${chunk.text()}</p>`);
    }
    const chatHistory = await chat.getHistory();
    // responseStream.write("<html>");
    // responseStream.write("<p>Hello!</p>");

    // responseStream.write("<h1>Let's start streaming response</h1>");
    // await new Promise((r) => setTimeout(r, 1000));
    // responseStream.write("<h2>Serverless</h2>");
    // await new Promise((r) => setTimeout(r, 1000));
    // responseStream.write("<h3>Is</h3>");
    // await new Promise((r) => setTimeout(r, 1000));
    // responseStream.write("<h3>Way</h3>");
    // await new Promise((r) => setTimeout(r, 1000));
    // responseStream.write("<h3>More</h3>");
    // await new Promise((r) => setTimeout(r, 1000));
    // responseStream.write("<h3>Mature</h3>");
    // await new Promise((r) => setTimeout(r, 1000));
    responseStream.write("<p>DONE!</p>");
    responseStream.write({ history: chatHistory });
    responseStream.end();
  }
);
