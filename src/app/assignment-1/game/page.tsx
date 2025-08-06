import GameContainer from '@/components/tic-tac-toe/GameContainer';

const GamePage = () => {
  return (
    <main className='my-10 mx-auto max-w-4xl text-center'>
      <div className='w-full'>
        <GameContainer />
      </div>
    </main>
  );
};

export default GamePage;
