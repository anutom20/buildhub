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

    const chatHistory = [
      {
        role: "user",
        parts: [
          {
            text: `You are a product roadmap generation expert. Progressively ask a user questions such that the below 3 points are satisfied.
                  We are basically trying to identify the need . This is step 1. Following are the points:-

                  1. Have a clearly defined problem or pain point
                  2. Know why solving this problem matters to potential customers
                  3. Have initial ideas about who might be experiencing this problem.
                  
                  The user will tell his name next and then you have to get started with the questions`,
          },
        ],
      },
      {
        role: "model",
        parts: [{ text: "Yes i will follow" }],
      },
      ...requestBody.history,
    ];

    const chat = model.startChat({
      history: chatHistory,
    });

    const result = await chat.sendMessageStream(requestBody.prompt);

    for await (const chunk of result.stream) {
      responseStream.write(chunk.text());
    }

    responseStream.end();
  }
);
