'use client';

import { useEffect } from 'react';

export default function DoorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const nav = document.querySelector('header.sticky, header.fixed') as HTMLElement;
    const footer = document.querySelector('footer') as HTMLElement;
    const banner = document.querySelector('[class*="gradient-aqua-coral"]') as HTMLElement;

    if (nav) nav.style.display = 'none';
    if (footer) footer.style.display = 'none';
    if (banner) banner.style.display = 'none';
    document.body.style.overflow = 'hidden';

    return () => {
      if (nav) nav.style.display = '';
      if (footer) footer.style.display = '';
      if (banner) banner.style.display = '';
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] overflow-auto bg-navy text-sand">
      {children}
    </div>
  );
}
