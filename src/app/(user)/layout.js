import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StoreProvider from "./storeProvider";

export const metadata = {
  title: "Optiko By Roman Khan",
  description: "i builed this website for my client",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <StoreProvider>
          <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans">
            <Header />
            {children}
            <Footer />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
