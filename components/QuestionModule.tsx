import { FC } from "react";
import StartQuizButton from "./StartQuizButton";

interface QuestionModuleProps {}

const QuestionModule: FC<QuestionModuleProps> = () => {
  return (
    <div className=" w-full border-5 border-red-500 aspect-square">
      <div>
        <p>Questions</p>
      </div>
      <div>
        <h1>Question Topic</h1>
        <p>
          <span>10</span> Questions
          <StartQuizButton />
        </p>
      </div>
    </div>
  );
};

export default QuestionModule;
