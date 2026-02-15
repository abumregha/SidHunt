import type {Metadata, Viewport} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'IdeaDigest - صائد الأفكار',
  description: 'ملخصات ذكية لأفضل أفكار ومواقع Reddit اليومية',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'IdeaDigest',
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: '#fcfcfc',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">{children}</body>
    </html>
  );
}
