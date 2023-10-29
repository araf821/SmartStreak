import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { Settings } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: { classId: string } }) => {
  const { classId } = params;

  const user = await getCurrentUser();
  if (!user) redirect("/setup");

  const thisClass = await db.class.findFirst({
    where: {
      id: classId,
    },
  });
  if (!thisClass) redirect("/dashboard");

  return (
    <div className="py-12">
      <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-6 px-4 md:grid-cols-3 md:gap-10 md:px-8 lg:grid-cols-4">
        {/* Class */}
        <div className="col-span-1 flex flex-col gap-4 md:col-span-2 lg:col-span-3">
          <div className="relative aspect-[5/2] w-full">
            <Image
              src={thisClass.imageUrl}
              alt=""
              fill
              className="rounded-sm border border-slate-700 object-cover"
            />
          </div>
          <div className="flex items-center justify-between">
            <h1 className="pt-2 text-3xl font-semibold md:text-4xl">
              {thisClass.name}
            </h1>
            {/* <button className="grid aspect-square w-10 place-items-center rounded-md border-indigo-600 bg-indigo-500">
              <Settings className="h-9 w-9 text-black" />
            </button> */}
          </div>
          <hr className="border-slate-700" />
        </div>

        <hr className="border-slate-700 md:hidden" />

        {/* Extras */}
        <div className="col-span-1 space-y-6">
          {user.profileType === "TEACHER" && (
            <div className="flex flex-col gap-4 rounded-lg border border-slate-700 bg-slate-900 p-4">
              <h2 className="text-lg font-semibold md:text-xl">Invite Code</h2>
              <p className="rounded-md border-2 border-slate-700 bg-slate-800 px-2 py-1.5 shadow-inner">
                {thisClass.inviteCode}
              </p>
            </div>
          )}
          <div className="flex flex-col gap-4 rounded-lg border border-slate-700 bg-slate-900 p-4"></div>
        </div>
      </div>
    </div>
  );
};

export default page;
