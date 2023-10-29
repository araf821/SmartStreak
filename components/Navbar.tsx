import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { FC } from "react";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <div className="w-full py-4 px-4 md:px-8 border-b border-slate-700">
      <div className="flex justify-between mx-auto max-w-screen-xl">
        <Link href="/dashboard" className="cursor-pointer">
          <span className="text-rose-500 text-3xl md:text-3xl font-semibold">
            Smart
          </span>
          <span className="text-indigo-500 text-3xl md:text-3xl font-semibold">
            Streak
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/question-of-the-day"
            className="font-bold px-3 py-1 rounded-md shadow-[0_0_20px_5px] transition hover:shadow-rose-500 shadow-rose-500/60 bg-rose-500"
          >
            Question of the day
          </Link>
          <Link href="/leaderboards">Leaderboards</Link>
          <Link href="/dashboard">Dashboard</Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
