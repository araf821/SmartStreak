import Heading from "@/components/Heading";
import ProfileCreationForm from "@/components/ProfileCreationForm";
import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const SetupPage = async () => {
  const { userId } = auth();
  const user = await currentUser();
  if (!userId || !user) return redirect("/");

  return (
    <div className="mx-auto px-4 sm:px-6 w-full min-h-[100dvh] py-16 max-w-screen-md">
      <Heading title="Create Profile" />
      <ProfileCreationForm />
    </div>
  );
};
export default SetupPage;
