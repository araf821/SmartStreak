import { question } from "@/components/DailyQuestion";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCorrectAnswer(question: question) {
  if (question.result === 1) {
    return question.choiceOne;
  } else if (question.result === 2) {
    return question.choiceTwo;
  } else if (question.result === 3) {
    return question.choiceThree;
  } else if (question.result === 4) {
    return question.choiceFour;
  }
}
