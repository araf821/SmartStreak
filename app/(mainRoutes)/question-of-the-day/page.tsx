import DailyQuestion from "@/components/DailyQuestion";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { redirect } from "next/navigation";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) redirect("/setup");

  return (
    <div className="mx-auto h-40 max-w-screen-md px-4 py-12 md:px-8">
      <h1 className="text-3xl font-semibold text-rose-500 md:text-4xl">
        Question of the Day
      </h1>
      <p className="py-1 text-slate-300">
        Complete the question of the day each day to add to your streak!
      </p>
      <hr className="border-slate-700" />
      <DailyQuestion user={currentUser} />
    </div>
  );
};

export default page;
