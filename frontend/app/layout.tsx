import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VibeCheck',
  description: 'Share your vibes with the world',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
