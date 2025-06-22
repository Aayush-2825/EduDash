import { Navbar } from "@/components/general/Navbar";

export default function Landing({ children }: {
  children: React.ReactNode}) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <Navbar/>
        {children}</main>
    </div>
  );
}