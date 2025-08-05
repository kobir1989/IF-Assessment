import { GAME_NAV_LINKS, NAV_LINKS } from '@/constants';
import NavLink from '@/components/ui/Navbar/NavLink';

interface DesktopNavProps {
  pathname: string;
  isLinkActive: (href: string) => boolean;
}

const DesktopNav: React.FC<DesktopNavProps> = ({ pathname, isLinkActive }) => (
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
              variant={pathname === link.href ? 'game' : 'ghost'}
            />
          </li>
        ))}
      </ul>
    )}
  </>
);

export default DesktopNav;
