import { Navbar } from "./_components/navbar";

export default function Layout({ children }: { children: React.ReactElement }) {
  return (
    <div className='h-full'>
      <Navbar />
      {children}
    </div>
  );
}
