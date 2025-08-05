import GameNavLinks from '@/components/ui/Navbar/GameNavLinks';
import { NAV_LINKS } from '@/constants';
import NavLink from '@/components/ui/Navbar/NavLink';

interface MobileNavProps {
  isOpen: boolean;
  pathname: string;
  isLinkActive: (href: string) => boolean;
  onLinkClick: () => void;
}

const MobileNavbar: React.FC<MobileNavProps> = ({
  isOpen,
  pathname,
  isLinkActive,
  onLinkClick,
}) => {
  if (!isOpen) return null;

  return (
    <div className='absolute top-full left-0 right-0 border-t border-gray-200 bg-background shadow-lg shadow-gray-200 md:hidden'>
      <div className='px-4 py-4 space-y-2'>
        {NAV_LINKS.map((link) => (
          <div key={link.href} className='space-y-2'>
            <NavLink
              href={link.href}
              label={link.label}
              isActive={isLinkActive(link.href)}
              className='w-full justify-start text-sm font-semibold'
              onClick={onLinkClick}
            />

            {/* Game Navigation Links under Assignment 1 */}
            {link.href === '/assignment-1' && (
              <GameNavLinks pathname={pathname} onLinkClick={onLinkClick} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileNavbar;
