import { GAME_NAV_LINKS, ROUTES } from '@/constants';
import { isPlayerExists } from '@/utils';
import { useGameStore } from '@/redux/hooks';
import Link from 'next/link';

interface GameNavLinksProps {
  pathname: string;
  onLinkClick: () => void;
}

const GameNavLinks: React.FC<GameNavLinksProps> = ({ pathname, onLinkClick }) => {
  const { players } = useGameStore();
  return (
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
            <Link
              href={gameLink.href}
              className={`${
                gameLink.href === ROUTES.assignment_1.game.game && !isPlayerExists(players)
                  ? 'cursor-not-allowed'
                  : ''
              }`}
            >
              {gameLink.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default GameNavLinks;
