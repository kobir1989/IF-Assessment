'use client';

import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { DesktopNav, HamburgerButton, MobileNavbar } from '.';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isLinkActive = (href: string) => {
    if (href === '/assignment-1') {
      return pathname.startsWith('/assignment-1');
    } else if (href === '/assignment-2') {
      return pathname.startsWith('/assignment-2');
    }
    return pathname === href;
  };

  return (
    <nav className='flex items-center justify-center py-4 px-4 md:px-8 box-shadow-sm sticky top-0 z-50 bg-background shadow-sm'>
      <div className='flex items-center justify-between w-full'>
        <DesktopNav pathname={pathname} isLinkActive={isLinkActive} />

        <HamburgerButton isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />

        <MobileNavbar
          isOpen={isMobileMenuOpen}
          pathname={pathname}
          isLinkActive={isLinkActive}
          onLinkClick={closeMobileMenu}
        />
      </div>
    </nav>
  );
};

export default Navbar;
