import { getCurrentUser } from "@/lib/getCurrentUser";
import { NextResponse } from "next/server";

import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const questionSchema = {
  type: "object",
  properties: {
    question: {
      type: "string",
      description: "The actual question users will be prompted to answer.",
    },
    choiceOne: {
      type: "string",
      description: "Multiple choice option number 1.",
    },
    choiceTwo: {
      type: "string",
      description: "Multiple choice option number 2.",
    },
    choiceThree: {
      type: "string",
      description: "Multiple choice option number 3.",
    },
    choiceFour: {
      type: "string",
      description: "Multiple choice option number 4.",
    },
    result: {
      type: "number",
      description:
        "Specify which one of the multiple choice options you've given is the right answer. Output should be 1, 2, 3, or 4.",
    },
  },
  required: [
    "result",
    "question",
    "choiceOne",
    "choiceTwo",
    "choiceThree",
    "ChoiceFour",
  ],
};

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a question generator embedded on a learning platform that is aimed towards children from grades 1-12. Your job is to generate multiple choice questions whenever prompted, the difficulty of the questions will be determined by the grade they are in. Sometimes the teacher from the particular grade may be the one looking for a question as well!",
        },
        {
          role: "user",
          content: `Generate a question for ${user.name}, they are a grade ${user.grade} ${user.profileType}.`,
        },
      ],
      functions: [
        {
          name: "generateQuestion",
          parameters: questionSchema,
          description: "",
        },
      ],
      function_call: { name: "generateQuestion" },
    });

    console.log(response.choices[0].message.function_call?.arguments);
    return NextResponse.json(
      response.choices[0].message.function_call?.arguments,
    );
  } catch (error) {
    console.log("QUESTION GENERATION ERROR", error);
    return new NextResponse("Internal Error", { status: 200 });
  }
}
