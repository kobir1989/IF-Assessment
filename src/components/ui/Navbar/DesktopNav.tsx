import { GAME_NAV_LINKS, NAV_LINKS } from '@/constants';
import NavLink from '@/components/ui/Navbar/NavLink';
import { useGameStore } from '@/redux/hooks';
import { isPlayerExists } from '@/utils';

interface DesktopNavProps {
  pathname: string;
  isLinkActive: (href: string) => boolean;
}

const DesktopNav: React.FC<DesktopNavProps> = ({ pathname, isLinkActive }) => {
  const { players } = useGameStore();
  return (
    <>
      {/* Main Navigation */}
      <ul className='hidden md:flex items-center gap-4'>
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <NavLink href={link.href} label={link.label} isActive={isLinkActive(link.href)} />
          </li>
        ))}
      </ul>

      {/* Game Navigation */}
      {pathname.startsWith('/assignment-1') && (
        <ul className='hidden md:flex items-center gap-4'>
          {GAME_NAV_LINKS.map((link) => (
            <li key={link.href}>
              <NavLink
                href={link.href}
                label={link.label}
                isActive={pathname === link.href}
                variant={pathname === link.href ? 'gradient' : 'ghost'}
                disabled={link.href === '/assignment-1/game' && !isPlayerExists(players)}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default DesktopNav;
