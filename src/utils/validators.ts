import { Player, ProductsRequestBody } from '@/types';

const validatePlayerName = (name: string, fieldName: string): string => {
  if (name.trim() === '') {
    return `${fieldName} name is required`;
  }
  if (name.trim().length > 10) {
    return `${fieldName} name must be less than 10 characters`;
  }
  return '';
};

// Validate player form data
export const validatePlayerForm = (
  formData: Player,
  setErrors: (errors: Player) => void
): boolean => {
  const newErrors: Player = {
    player1: '',
    player2: '',
  };

  // Validate each player names
  newErrors.player1 = validatePlayerName(formData.player1, 'Player 1');
  newErrors.player2 = validatePlayerName(formData.player2, 'Player 2');

  // Check if players have same name
  if (formData.player1.trim() === formData.player2.trim() && newErrors.player2 === '') {
    newErrors.player2 = 'Player 2 name must be different from Player 1';
  }

  setErrors(newErrors);

  return Object.values(newErrors).every((error) => error === '');
};

// Validate product form data
export const validateProductFormData = (formData: ProductsRequestBody): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!formData.title) {
    errors.title = 'Title is required';
  }
  if (!formData.price) {
    errors.price = 'Price is required';
  }
  if (!formData.categoryId) {
    errors.categoryId = 'Category is required';
  }
  if (!formData.description) {
    errors.description = 'Description is required';
  }
  if (formData.images.length === 0 || formData.images.every((image) => !image)) {
    errors.images = 'Images are required';
  }

  return errors;
};

// Get error message from product API response
export const getProductApiErrorMessage = (error: unknown): string => {
  if (error && typeof error === 'object' && 'data' in error) {
    const errorData = (error as { data?: { message?: string } }).data;
    if (errorData && typeof errorData.message === 'string') {
      return errorData.message;
    }
  }
  if (error && typeof error === 'object' && 'message' in error) {
    const errorMessage = (error as { message?: string }).message;
    if (typeof errorMessage === 'string') {
      return errorMessage;
    }
  }
  return 'An unexpected error occurred. Please try again.';
};
