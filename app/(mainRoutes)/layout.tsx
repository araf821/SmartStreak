import Navbar from "@/components/Navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
};
export default MainLayout;
