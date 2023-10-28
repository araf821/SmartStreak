import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const SetupPage = () => {
  const { userId } = auth();

  if (!userId) redirect("/");

  return <div>SetupPage</div>;
};
export default SetupPage;
