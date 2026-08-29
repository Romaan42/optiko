import "../../globals.css";

export const metadata = {
  title: "Optiko By Roman Khan",
  description: "i builed this website for my client",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
