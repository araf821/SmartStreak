import CreateClassModal from "@/components/modals/CreateClassModal";
import JoinClassModal from "@/components/modals/JoinClassModal";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { auth } from "@clerk/nextjs";
import {
  BarChart4,
  BookCheck,
  Crown,
  Flame,
  PenSquare,
  Plus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const { userId } = auth();
  if (!userId) redirect("/");

  const user = await db.user.findUnique({
    where: {
      userId,
    },
    include: {
      classes: true,
    },
  });

  if (!user) redirect("/setup");

  return (
    <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-6 px-4 py-12 sm:grid-cols-2 md:grid-cols-5 md:px-8 lg:grid-cols-3 lg:gap-10">
      {/* Profile Info */}
      <div className="col-span-1 w-full space-y-2 md:col-span-2 lg:col-span-1">
        <div className="flex gap-4 rounded-t-lg border border-slate-700 bg-slate-900 p-2 md:p-4">
          <div className="relative aspect-square w-32 overflow-hidden rounded-lg">
            <Image src={user.imageUrl} alt="" fill className="object-cover" />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-semibold md:text-2xl">{user.name}</h3>
            <p className="capitalize text-slate-300 md:text-lg">
              {user.profileType.toLowerCase()}
            </p>
            <button className="mt-1 flex w-fit items-center gap-2 rounded-md bg-rose-500 px-1.5 py-0.5 font-bold text-white">
              Edit Profile <PenSquare className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4 rounded-b-lg border border-slate-700 bg-slate-900 p-4">
          <p className="text-xl font-medium md:text-2xl">Stats</p>
          <div className="flex items-center justify-between rounded-xl border border-indigo-700 bg-indigo-500 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <Flame className="h-10 w-10 fill-black text-black" />
              <span className="h-10 w-0.5 bg-indigo-700/50" />
              <span className="text-lg text-black md:text-xl">
                Current Streak
              </span>
            </div>
            <span className="text-xl font-bold text-black md:text-2xl">
              {user.currentStreak ?? "0"}
            </span>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-indigo-700 bg-indigo-500 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <BarChart4 className="h-10 w-10 text-black" />
              <span className="h-10 w-0.5 bg-indigo-700/50" />
              <span className="text-lg text-black md:text-xl">
                Highest Streak
              </span>
            </div>
            <span className="text-xl font-bold text-black md:text-2xl">
              {user.highestStreak ?? "0"}
            </span>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-indigo-700 bg-indigo-500 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <BookCheck className="h-10 w-10 text-black" />
              <span className="h-10 w-0.5 bg-indigo-700/50" />
              <span className="text-lg text-black md:text-xl">
                Questions Answered
              </span>
            </div>
            <span className="text-xl font-bold text-black md:text-2xl">
              {user.questionsAnswered ?? "0"}
            </span>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-indigo-700 bg-indigo-500 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <Crown className="h-10 w-10 fill-black text-black" />
              <span className="h-10 w-0.5 bg-indigo-700/50" />
              <span className="text-lg text-black md:text-xl">Global Rank</span>
            </div>
            <span className="text-xl font-bold text-black md:text-2xl">
              N/A
            </span>
          </div>
        </div>
      </div>

      {/* Classes */}
      <div className="col-span-1 w-full px-4 md:col-span-3 lg:col-span-2">
        <h2 className="text-3xl md:text-4xl pb-2">Your Classes</h2>
        <hr className="mb-6 border-slate-700" />
        <div className="grid grid-cols-1 gap-8 min-[550px]:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2">
          {user.classes.map((c) => (
            <div
              className="flex aspect-square w-full flex-col justify-between overflow-hidden rounded-xl border border-slate-700 bg-slate-900"
              key={c.id}
            >
              <div className="">
                <div className="relative aspect-[5/2] w-full">
                  <Image
                    src={c.imageUrl}
                    alt=""
                    fill
                    className="border-b border-slate-700 object-cover"
                  />
                </div>
                <div className="p-4">
                  <Link
                    href={`/class/${c.id}`}
                    className="whitespace-pre-line break-words text-xl font-semibold xl:text-2xl"
                  >
                    {c.name}
                  </Link>
                </div>
              </div>
              {user.profileType !== "TEACHER" && (
                <button className="mb-4 ml-4 w-fit rounded-md border border-rose-500 px-1.5 py-0.5 text-rose-500">
                  Leave Class
                </button>
              )}
              {user.profileType !== "STUDENT" && (
                <button className="mb-4 ml-4 w-fit rounded-md border border-rose-500 px-1.5 py-0.5 text-rose-500">
                  Delete Class
                </button>
              )}
            </div>
          ))}
          {user.profileType === "STUDENT" ? (
            <JoinClassModal />
          ) : (
            <CreateClassModal />
          )}
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;

const dummyClass = [
  {
    name: "EECS9999 - Advanced Quantum Computation",
    imageUrl:
      "https://images.unsplash.com/photo-1592424002053-21f369ad7fdb?auto=format&fit=crop&q=80&w=2148&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "EECS9999 - Advanced Quantum Computation",
    imageUrl:
      "https://images.unsplash.com/photo-1592424002053-21f369ad7fdb?auto=format&fit=crop&q=80&w=2148&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "EECS9999 - Advanced Quantum Computation",
    imageUrl:
      "https://images.unsplash.com/photo-1592424002053-21f369ad7fdb?auto=format&fit=crop&q=80&w=2148&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "EECS9999 - Advanced Quantum Computation",
    imageUrl:
      "https://images.unsplash.com/photo-1592424002053-21f369ad7fdb?auto=format&fit=crop&q=80&w=2148&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "EECS9999 - Advanced Quantum Computation",
    imageUrl:
      "https://images.unsplash.com/photo-1592424002053-21f369ad7fdb?auto=format&fit=crop&q=80&w=2148&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
