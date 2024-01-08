import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from '../components/NavBar';
import Provider from '../components/Provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TodoHGarisea',
  description: 'Plan your day beforehand',
};

export default function RootLayout({
  children,
  session
}: {
  children: React.ReactNode;
  session?: any; // Add this line to define the session prop
}) {
  return (
    <html lang="en">
      <body>
        <Provider session={session}> {/* Pass session to Provider */}
          <div className="main">
            <div className="gradient" id="gradient" />
          </div>

          <main className="app">
            <NavBar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
