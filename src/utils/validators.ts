import { ProductsRequestBody } from '@/types';

interface PlayerFormData {
  player1: string;
  player2: string;
}

interface FormErrors {
  player1: string;
  player2: string;
}

const validatePlayerName = (name: string, fieldName: string): string => {
  if (name.trim() === '') {
    return `${fieldName} name is required`;
  }
  if (name.trim().length > 10) {
    return `${fieldName} name must be less than 10 characters`;
  }
  return '';
};

export const validateForm = (
  formData: PlayerFormData,
  setErrors: (errors: FormErrors) => void
): boolean => {
  const newErrors: FormErrors = {
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
export const handleValidateFormData = (
  formData: ProductsRequestBody
): Partial<ProductsRequestBody> => {
  const errors: Partial<ProductsRequestBody> = {};

  if (!formData.title) {
    errors.title = 'Title is required';
  }
  if (!formData.price) {
    errors.price = 0;
  }
  if (!formData.categoryId) {
    errors.categoryId = 0;
  }
  if (!formData.description) {
    errors.description = 'Description is required';
  }
  if (formData.images.length === 0 || formData.images.every((image) => !image)) {
    errors.images = [];
  }

  return errors;
};
