'use client'

import TypeWriter from "@/components/TypeWriter";
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  weight: "700",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="">
      <div className="h-[100dvh] flex items-center flex-col justify-center gap-8">
        <p
          className={`text-center text-slate-200 w-fit px-4 py-2 bg-black text-8xl font-semibold ${quicksand.className}`}
        >
          SmartStreak
        </p>
        <TypeWriter/>
      </div>
    </div>
  );
}
