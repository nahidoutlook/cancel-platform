import "./globals.css";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";






export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background min-h-screen flex flex-col pb-24">
        

        <TopBar />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
   
        <Footer />
      </body>
    </html>
  );
}
