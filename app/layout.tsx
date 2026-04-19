import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Feta Bingo',
  description: 'Download Feta Bingo - The ultimate bingo gaming experience',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-system">{children}</body>
    </html>
  );
}