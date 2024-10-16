import { NextRequest, NextResponse } from "next/server";
import {
  GenerateContentStreamResult,
  GoogleGenerativeAI,
} from "@google/generative-ai";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const requestBody = await req.json();

    if (!requestBody.prompt || !requestBody.history) {
      return NextResponse.json(
        { message: "prompt or history is missing" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

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

    const stream = makeStream(readStreamFromGemini(result));
    const response = new StreamingResponse(stream);
    return response;
  } catch (err) {
    return NextResponse.json({
      message: `An error occured while streaming = ${err}`,
    });
  }
}

/**
 * async generator that simulate a data fetch from external resource and
 * return chunck of data every second
 */
async function* readStreamFromGemini(
  result: GenerateContentStreamResult
): AsyncGenerator<string, void, unknown> {
  for await (const chunk of result.stream) {
    yield chunk.text();
  }
}

export const makeStream = <T extends string>(
  generator: AsyncGenerator<T, void, unknown>
) => {
  const encoder = new TextEncoder();
  return new ReadableStream<any>({
    async start(controller) {
      for await (let chunk of generator) {
        const chunkData = encoder.encode(chunk);
        controller.enqueue(chunkData);
      }
      controller.close();
    },
  });
};

/**
 * A custom Response subclass that accepts a ReadableStream.
 * This allows creating a streaming Response for async generators.
 */
class StreamingResponse extends Response {
  constructor(res: ReadableStream<any>, init?: ResponseInit) {
    super(res as any, {
      ...init,
      status: 200,
      headers: {
        ...init?.headers,
      },
    });
  }
}
