import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AccountHeader from '@/components/AccountHeader';
import Providers from '@/components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DevHunter - Find Your Next Developer Role',
  description: 'Discover developer job opportunities from multiple sources in one place',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AccountHeader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
