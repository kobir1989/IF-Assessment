'use client';

import React, { useEffect, useRef, useState } from 'react';
import Input from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Play } from 'lucide-react';
import { useAppDispatch } from '@/redux/hooks';
import { setPlayers } from '@/redux/features/ticTacToeSlice';
import { validatePlayerForm } from '@/utils';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants';

const INITIAL_STATE = {
  player1: '',
  player2: '',
};

const PlayerSetupForm = () => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState(INITIAL_STATE);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const hadleSuccess = () => {
    setFormData(INITIAL_STATE);
    setErrors(INITIAL_STATE);
    router.push(ROUTES.assignment_1.game.game);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validatePlayerForm(formData, setErrors)) return;

    dispatch(setPlayers({ player1: formData.player1, player2: formData.player2 }));
    hadleSuccess();
  };

  return (
    <form className='flex flex-col gap-8 mt-8 w-full max-w-md' onSubmit={handleSubmit}>
      <div className='flex flex-col gap-4'>
        <div>
          <Input
            placeholder='Enter Player 1 name'
            id='player1'
            name='player1'
            value={formData.player1}
            onChange={handleChange}
            variant={errors.player1 ? 'error' : 'default'}
            ref={inputRef}
          />
          {errors.player1 && (
            <span className='text-red-500 text-[12px] line-clamp-1 ml-4'>{errors.player1}</span>
          )}
        </div>
        <div>
          <Input
            placeholder='Enter Player 2 name'
            id='player2'
            name='player2'
            value={formData.player2}
            onChange={handleChange}
            variant={errors.player2 ? 'error' : 'default'}
          />
          {errors.player2 && (
            <span className='text-red-500 text-[12px] ml-4'>{errors.player2}</span>
          )}
        </div>
      </div>
      <Button type='submit' className='w-full' variant='gradient' size='lg'>
        <Play />
        Start Game
      </Button>
    </form>
  );
};

export default PlayerSetupForm;
