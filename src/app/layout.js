import { Geist, Geist_Mono, Lovers_Quarrel } from 'next/font/google';
import './globals.css';
import { HeartCursorEffect, RippleEffect } from '@/components';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const loversQuarrel = Lovers_Quarrel({
  variable: '--font-lovers-quarrel',
  subsets: ['latin'],
  weight: '400',
  italic: true,
});
export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${loversQuarrel.variable} antialiased bg-black`}
      >
        <HeartCursorEffect>
          <RippleEffect>{children}</RippleEffect>
        </HeartCursorEffect>
      </body>
    </html>
  );
}
