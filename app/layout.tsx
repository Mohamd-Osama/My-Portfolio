import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import Navbar from '@/components/Navbar';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mohamed Osama | Data Analyst & BI Developer',
  description:
    'Senior Computer Science student at Assiut University specializing in Data Analytics, Power BI, SQL, and Business Intelligence. Delivering end-to-end data solutions that save time and boost operational efficiency.',
  keywords: [
    'Mohamed Osama',
    'Data Analyst',
    'Power BI Developer',
    'SQL Developer',
    'Business Intelligence',
    'Data Science Portfolio',
  ],
  authors: [{ name: 'Mohamed Osama' }],
  openGraph: {
    title: 'Mohamed Osama | Data Analyst & BI Developer',
    description: 'Premium Data Analytics Portfolio — Digital Insight Lab',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
