import Input from '@/components/ui/Input';
import React from 'react';
import { Button } from '@/components/ui/Button';
import { Play } from 'lucide-react';

const PlayerSetupForm = () => {
  return (
    <form className='flex flex-col gap-8 mt-8 w-full max-w-md'>
      <div className='flex flex-col gap-4'>
        <Input placeholder='Enter Player 1 name' />
        <Input placeholder='Enter Player 2 name' />
      </div>
      <Button type='submit' className='w-full' variant='game' size='lg'>
        <Play />
        Start Game
      </Button>
    </form>
  );
};

export default PlayerSetupForm;
