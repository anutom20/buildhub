import { GoogleGenerativeAI } from "@google/generative-ai";

export const geminiStream = awslambda.streamifyResponse(
  async (event, responseStream, context) => {
    const httpResponseMetadata = {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html",
      },
    };

    responseStream = awslambda.HttpResponseStream.from(
      responseStream,
      httpResponseMetadata
    );
    const requestBody = JSON.parse(event.body);

    // handle on frontend if have time

    if (!requestBody?.prompt) {
      responseStream.write("NO_PROMPT_FOUND");
      responseStream.end();
    }

    if (!requestBody?.history) {
      responseStream.write("NO_HISTORY_FOUND");
      responseStream.end();
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({
      history: requestBody.history,
    });

    const result = await chat.sendMessageStream(requestBody.prompt);

    for await (const chunk of result.stream) {
      responseStream.write(chunk.text());
    }

    responseStream.end();
  }
);
