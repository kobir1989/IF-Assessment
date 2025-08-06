import { useState, useCallback, useRef } from 'react';

interface UseConfettiReturn {
  showConfetti: boolean;
  confettiPieces: number;
  triggerRoundWinConfetti: () => void;
  triggerSeriesWinConfetti: () => void;
  stopConfetti: () => void;
}

export const useConfetti = (): UseConfettiReturn => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState(1000);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const triggerRoundWinConfetti = useCallback(() => {
    clearTimer();
    setShowConfetti(true);
    setConfettiPieces(1000);

    // Hide confetti after 3 seconds
    timerRef.current = setTimeout(() => {
      setShowConfetti(false);
      timerRef.current = null;
    }, 4000);
  }, [clearTimer]);

  const triggerSeriesWinConfetti = useCallback(() => {
    clearTimer();
    setShowConfetti(true);
    setConfettiPieces(1500);

    // Hide confetti after 5 seconds for series wins
    timerRef.current = setTimeout(() => {
      setShowConfetti(false);
      timerRef.current = null;
    }, 6000);
  }, [clearTimer]);

  const stopConfetti = useCallback(() => {
    clearTimer();
    setShowConfetti(false);
  }, [clearTimer]);

  return {
    showConfetti,
    confettiPieces,
    triggerRoundWinConfetti,
    triggerSeriesWinConfetti,
    stopConfetti,
  };
};
