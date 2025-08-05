'use client';

import { Button } from '@/components/ui/Button';
import { NAV_LINKS } from '@/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className='flex items-center justify-center py-4 px-8 box-shadow-sm sticky top-0 z-50 bg-background shadow-sm  '>
      <ul className='flex items-center gap-4'>
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.href}>
              <Button
                variant={isActive ? 'default' : 'outline'}
                size='sm'
                asChild
                className='text-sm font-semibold transition-colors duration-300'
              >
                <Link href={link.href}>{link.label}</Link>
              </Button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
