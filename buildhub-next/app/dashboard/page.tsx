import { auth, signOut } from "@/auth";
import { notFound } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import MainSection from "@/components/MainSection";

const Dashboard = async () => {
  const session = await auth();
  if (!session) return notFound();
  return (
    <main className="h-full flex flex-row">
      <Sidebar />
      <MainSection />
      {/* <h1>Hello {session?.user?.name}</h1>

      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Log Out</button>
      </form> */}
    </main>
  );
};
export default Dashboard;
