import Navbar from "./components/navbar";

export default function BackendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-4">
        <Navbar />
        <div className="col-span-3">
            {children}
        </div>
    </div>
  );
}
