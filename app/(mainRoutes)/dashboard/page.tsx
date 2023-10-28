import { getCurrentUser } from "@/lib/getCurrentUser";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const user = await getCurrentUser();

  if (!user) redirect("/setup");

  return <div>DashboardPage</div>;
};
export default DashboardPage;
