import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HabitStack - Build Better Habits, Build a Better Life',
  description: 'Track your habits, analyze patterns, and achieve your goals with AI-powered insights.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-white antialiased">{children}</body>
    </html>
  );
}
