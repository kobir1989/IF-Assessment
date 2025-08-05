import { GAME_NAV_LINKS } from '@/constants';
import Link from 'next/link';

interface GameNavLinksProps {
  pathname: string;
  onLinkClick: () => void;
}

const GameNavLinks: React.FC<GameNavLinksProps> = ({ pathname, onLinkClick }) => (
  <ul className='ml-4 space-y-1'>
    {GAME_NAV_LINKS.map((gameLink) => {
      const isGameActive = pathname === gameLink.href;
      return (
        <li
          key={gameLink.href}
          className={`${
            isGameActive ? 'text-blue-600' : 'text-gray-500'
          } text-sm font-semibold transition-colors duration-300`}
          onClick={onLinkClick}
        >
          <Link href={gameLink.href}>{gameLink.label}</Link>
        </li>
      );
    })}
  </ul>
);

export default GameNavLinks;
