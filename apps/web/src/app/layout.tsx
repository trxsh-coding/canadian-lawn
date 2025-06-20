import type { Metadata, Viewport } from 'next';
import './globals.css';
import React from 'react';

import Providers from '@/connector/QueryProvider';

export const metadata: Metadata = {
  title: 'Газоны Канады',
  description: 'Интернет-магазин семян газонных трав',
};

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Газоны Канады</title>
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
