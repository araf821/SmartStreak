import Heading from "@/components/Heading";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const SetupPage = () => {
  const { userId } = auth();

  if (!userId) redirect("/");

  return (
    <div className="mx-auto px-4 sm:px-6 w-full min-h-[100dvh] py-16 max-w-screen-md">
      <Heading title="Create Profile" />
    </div>
  );
};
export default SetupPage;
