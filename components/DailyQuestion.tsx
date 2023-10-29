"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { toast } from "sonner";
import { getCorrectAnswer } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface DailyQuestionProps {
  user: User;
}

export type question = {
  question: string;
  choiceOne: string;
  choiceTwo: string;
  choiceThree: string;
  choiceFour: string;
  result: number;
};

const DailyQuestion: FC<DailyQuestionProps> = ({ user }) => {
  const { userId } = useAuth();
  const router = useRouter();
  const [question, setQuestion] = useState<question | null>(null);
  const [generating, setGenerating] = useState(false);
  const [selected, setSelected] = useState(0);
  const [gameover, setGameover] = useState<null | string>(null);

  const onCall = async () => {
    setGenerating(true);
    try {
      const response = await axios.post("/api/daily");

      setQuestion(JSON.parse(response.data));
    } catch (error) {
      console.log("------------------- ERROR -----------------\n\n\n");
    } finally {
      setGenerating(false);
    }
  };

  useEffect(() => {
    onCall();
  }, []);

  if (generating) {
    return (
      <div className="grid w-full place-items-center space-y-4 pt-32">
        <span className="loader"></span>
        <p className="font-medium md:text-lg">Generating Question...</p>
      </div>
    );
  }

  const onSubmit = async () => {
    if (selected === question?.result) {
      toast.success("Congrats!");
      setGameover("PASS");
    } else {
      toast.error("Oops!");
      setGameover("FAIL");
    }

    // await axios.post("/api/streak", { userId });
  };

  return (
    <div className="py-4">
      {question && (
        <div className="flex flex-col gap-4">
          <h4 className="text-xl font-bold md:text-2xl">{question.question}</h4>
          {gameover ? (
            gameover === "PASS" ? (
              <>
                <p className="text-4xl text-green-500 md:text-5xl">
                  Congratulations!
                </p>
                <hr className="border-slate-700" />
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => router.push("/")}
                    className="rounded-xl border-2 border-slate-700 px-2.5 py-1.5 text-lg text-slate-300 transition hover:bg-slate-800"
                  >
                    Back to Home
                  </button>
                  <div className="flex items-center gap-4">
                    Feeling lucky?
                    <button
                      onClick={() => router.refresh()}
                      className="rounded-xl border-2 border-indigo-500 px-2.5 py-1.5 text-lg font-bold text-indigo-500 transition hover:bg-indigo-500 hover:text-white"
                    >
                      Try Another
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <p className="text-4xl text-red-500 md:text-5xl">Oops!</p>
                <p>That was the wrong answer.</p>
                <p>Don&rsquo;t worry! Your streak was increased anyway!</p>
                <p>Thanks for your participation.</p>
                <div className="rounded-lg bg-slate-800 p-2.5">
                  <p className="text-lg font-medium md:text-xl">
                    <span className="text-green-500">Correct Answer:</span>{" "}
                    {getCorrectAnswer(question)}
                  </p>
                </div>
                <hr className="border-slate-700" />
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => router.push("/")}
                    className="rounded-xl border-2 border-slate-700 px-2.5 py-1.5 text-lg text-slate-300 transition hover:bg-slate-800"
                  >
                    Back to Home
                  </button>
                  <div className="flex items-center gap-4">
                    Feeling lucky?
                    <button
                      onClick={() => router.refresh()}
                      className="rounded-xl border-2 border-indigo-500 px-2.5 py-1.5 text-lg font-bold text-indigo-500 transition hover:bg-indigo-500 hover:text-white"
                    >
                      Try Another
                    </button>
                  </div>
                </div>
              </>
            )
          ) : (
            <>
              <RadioGroup
                onValueChange={(e) => {
                  setSelected(parseInt(e));
                }}
                className="md:text-lg"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem id="1" value="1" />
                  <label htmlFor="1">{question.choiceOne}</label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem id="2" value="2" />
                  <label htmlFor="2">{question.choiceTwo}</label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem id="3" value="3" />
                  <label htmlFor="3">{question.choiceThree}</label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem id="4" value="4" />
                  <label htmlFor="4">{question.choiceFour}</label>
                </div>
              </RadioGroup>
              <button
                onClick={onSubmit}
                className="mt-2 w-40 rounded-lg border-2 border-indigo-500 px-3 py-1.5 text-lg font-semibold text-indigo-500 transition hover:bg-indigo-500 hover:text-white"
              >
                Submit
              </button>
              <hr className="border-slate-700" />
              <p>
                Is this question too hard?{" "}
                <button onClick={onCall} className="text-rose-500">
                  Click Here
                </button>{" "}
                to generate something new!
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DailyQuestion;
