import TypeWriter from "@/components/TypeWriter";
import workSvg from "public/code.svg";
import Image from "next/image";
import { SignInButton, SignUpButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Home() {
  const { userId } = auth();
  if (userId) redirect("/dashboard");

  return (
    <div className="">
      <div className="h-[100dvh] px-4 flex items-center flex-col justify-center gap-8">
        <div className="relative aspect-square w-[60vw] sm:w-[40vw] md:w-[25vw] lg:w-[15vw]">
          <Image src={workSvg} alt="idk" fill className="object-cover" />
        </div>
        <p
          className={`text-center text-slate-200 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold`}
        >
          <span className="text-rose-500">Smart</span>
          <span className="text-indigo-500">Streak</span>
        </p>
        <div className="text-lg h-12 md:text-xl text-center -mt-4">
          <TypeWriter />
        </div>
        <div className="mx-auto items-between max-w-xs w-full flex justify-between items-center">
          <SignInButton>
            <button className="rounded-full transition hover:text-white hover:bg-rose-500 bg-transparent border-2 border-rose-500 px-2 w-32 text-rose-500 py-1 text-lg">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton>
            <button className="rounded-full bg-indigo-500 px-2 w-32 text-white py-1 text-lg">
              Get Started
            </button>
          </SignUpButton>
        </div>
      </div>
    </div>
  );
}
