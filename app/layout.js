import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-primary text-secondary font-sans">
        <nav className="bg-black text-center p-4">
          <Link href="/" className="text-accent mx-4 font-bold hover:underline">
            Home
          </Link> {/* Missing href attribute and use the Link component from the next library */}
          <Link href="/about" className="text-accent mx-4 font-bold hover:underline">
            About
          </Link> {/* Missing href attribute and use the Link component from the next library */}
        </nav>
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}