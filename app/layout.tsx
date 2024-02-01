'use client';
import { Container, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import Header from './Header';
import { useEffect } from 'react';
import { BasketProvider } from './context/BasketContext';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
    const hokodoObject = (window as any).Hokodo;
    if (hokodoObject !== null) {
      (window as any).hokodoInstance = hokodoObject(
        'pk_test_GN0bK94CL1zsp_4mYsPMfdUZ0zdBfSuRpN0UEoSTqLg',
        {
          locale: 'en-GB',
          currency: 'GBP',
        }
      );

      (window as any).hokodoInstance.marketing();

      console.log('Hokodo Loaded');
    }
  }, []);
  return (
    <html lang='en'>
      <head>
        <script src='https://js-dev.hokodo.co/hokodo-js/v1'></script>
      </head>
      <body>
        <hokodo-marketing data-element='credit-limit-banner' />
        <BasketProvider>
          <ThemeProvider theme={createTheme()}>
            <CssBaseline />
            <Container maxWidth='lg'>
              <Header title='Charlotte Shop' />
              <main>{children}</main>
            </Container>
          </ThemeProvider>
        </BasketProvider>
      </body>
    </html>
  );
}
// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>{children}</body>
//     </html>
//   );
// }
