import StoreProvider from '@/shared/providers/reduxProvider';
import { ThemeProvider } from '@/shared/providers/themesProvider';
import { Footer } from '@/widgets/Footer';
import Header from '@/widgets/Header';
import { HeaderMobile } from '@/widgets/headerMobile';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import React from 'react';
import { Toaster } from 'sonner';

import './globals.css';

export const metadata: Metadata = {
  title: 'StarFlue Shop',
  description: 'Generated by myself.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} bg-lightSpace font-sans dark:bg-darkSpace`}
      >
        <StoreProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div
              className={`grid grid-rows-[65px_4fr] grid-cols-1 min-h-screen`}
            >
              <Header />
              <HeaderMobile />
              {children}
              <Footer />
            </div>
            <Toaster richColors={true} />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
