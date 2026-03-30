import { Geist, Geist_Mono } from 'next/font/google';
import Navbar from '@/components/Navbar';
import ApiProvider from '@/context/ApiContext';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Movie Vault',
  description: 'A polished movie discovery app built with Next.js and the OMDb API.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ApiProvider>
          <Navbar />
          {children}
        </ApiProvider>
      </body>
    </html>
  );
}
