'use client';

import { useEffect } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Hide the public site Navigation and Footer when admin pages are active
  useEffect(() => {
    document.body.classList.add('admin-active');
    return () => {
      document.body.classList.remove('admin-active');
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-navy text-sand">
      {children}
    </div>
  );
}
