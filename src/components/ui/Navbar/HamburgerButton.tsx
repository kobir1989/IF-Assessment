import { Button } from '@/components/ui/Button';

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const HamburgerButton: React.FC<HamburgerButtonProps> = ({ isOpen, onClick }) => (
  <Button variant='ghost' size='icon' className='md:hidden flex flex-col gap-1' onClick={onClick}>
    <span
      className={`w-6 h-0.5 bg-current transition-all duration-300 ${
        isOpen ? 'rotate-45 translate-y-1.5' : ''
      }`}
    />
    <span
      className={`w-6 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}
    />
    <span
      className={`w-6 h-0.5 bg-current transition-all duration-300 ${
        isOpen ? '-rotate-45 -translate-y-1.5' : ''
      }`}
    />
  </Button>
);

export default HamburgerButton;
