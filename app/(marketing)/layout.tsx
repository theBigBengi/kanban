import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-full'>
      <Navbar />
      <main className='pt-40 pb-20'>{children}</main>
      <Footer />
    </div>
  );
}
