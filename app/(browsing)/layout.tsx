import Footer from "./(layout)/footer/Footer";
import Navbar from "./(layout)/navbar/Navbar";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
