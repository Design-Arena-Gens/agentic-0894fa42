import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Agentic YouTube Trend Scout',
  description: 'AI agents that surface emerging YouTube trends tailored to your audience.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased font-sans bg-background text-white">
        {children}
      </body>
    </html>
  );
}
