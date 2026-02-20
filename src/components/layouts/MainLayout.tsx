import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import FloatingWhatsApp from '@/components/common/FloatingWhatsApp';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
