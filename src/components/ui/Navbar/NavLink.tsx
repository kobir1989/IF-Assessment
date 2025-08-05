import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface NavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
  variant?: 'default' | 'outline' | 'game' | 'ghost';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  label,
  isActive,
  variant = isActive ? 'default' : 'outline',
  className = 'text-sm font-semibold transition-colors duration-300',
  onClick,
  disabled,
}) => (
  <Button
    variant={variant}
    size='sm'
    asChild
    className={className}
    onClick={onClick}
    disabled={disabled}
  >
    <Link href={href}>{label}</Link>
  </Button>
);

export default NavLink;
