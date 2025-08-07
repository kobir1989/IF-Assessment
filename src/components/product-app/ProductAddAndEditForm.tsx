import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import {
  useCreateProductMutation,
  useGetProductByIdQuery,
  useGetProductCategoryQuery,
  useUpdateProductMutation,
} from '@/redux/api/productApp';
import { Category, ProductsRequestBody } from '@/types';
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Loader from '@/components/ui/Loader';
import { Plus, Trash } from 'lucide-react';
import Popover from '@/components/ui/Popover';
import { getProductApiErrorMessage, validateProductFormData } from '@/utils/validators';

const INITIAL_FORM_DATA = {
  title: '',
  price: 0,
  description: '',
  categoryId: 0,
  images: [],
};

const ProductAddAndEditForm = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');
  const isEditMode = Boolean(productId);
  const router = useRouter();

  const [formData, setFormData] = useState<ProductsRequestBody>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccessPopover, setShowSuccessPopover] = useState(false);
  const [showErrorPopover, setShowErrorPopover] = useState(false);
  const [popoverMessage, setPopoverMessage] = useState('');

  const [createProduct, { isLoading: isCreating, error: createError }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating, error: updateError }] = useUpdateProductMutation();
  const { data: categories, isLoading: isLoadingCategories } = useGetProductCategoryQuery({
    params: { limit: 100 },
  });

  // Fetch product data when in edit mode
  const { data: existingProduct, isLoading: isLoadingProduct } = useGetProductByIdQuery(
    { productId: productId! },
    { skip: !isEditMode }
  );

  // fill form data when editing
  useEffect(() => {
    if (isEditMode && existingProduct) {
      setFormData({
        title: existingProduct.title,
        price: existingProduct.price,
        description: existingProduct.description,
        categoryId: existingProduct.category.id,
        images: existingProduct.images.length > 0 ? existingProduct.images : [''],
      });
    }
  }, [isEditMode, existingProduct]);

  useEffect(() => {
    if (formData.images.length === 0) {
      setFormData((prev) => ({
        ...prev,
        images: [''],
      }));
    }
  }, [formData.images.length]);

  const handleInputChange = (field: keyof ProductsRequestBody, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [field]: '',
    }));
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  const addImageField = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ''],
    }));
  };

  const removeImageField = (index: number) => {
    if (formData.images.length > 1) {
      const newImages = formData.images.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        images: newImages,
      }));
    }
  };

  const filterImageUrl = (images: string[]) => {
    return images.filter((image) => image !== '');
  };

  const validateFormData = () => {
    const errors = validateProductFormData(formData);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSuccess = (message: string) => {
    setFormData(INITIAL_FORM_DATA);
    setPopoverMessage(message);
    setShowSuccessPopover(true);
    router.push('/assignment-2');
  };
  const handleSubmitError = (error: unknown) => {
    const errorMessage = getProductApiErrorMessage(error);
    setPopoverMessage(errorMessage);
    setShowErrorPopover(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateFormData()) {
      return;
    }

    if (isEditMode && productId) {
      // Update existing product
      updateProduct({
        productId,
        body: {
          ...formData,
          images: filterImageUrl(formData.images),
        },
      })
        .unwrap()
        .then(() => {
          handleSuccess('Product updated successfully!');
        })
        .catch((error) => {
          handleSubmitError(error);
        });
    } else {
      // Create new product
      createProduct({
        body: {
          ...formData,
          images: filterImageUrl(formData.images),
        },
      })
        .unwrap()
        .then(() => {
          handleSuccess('Product created successfully!');
        })
        .catch((error) => {
          handleSubmitError(error);
        });
    }
  };

  // Show loading when fetching product data in edit mode
  if (isEditMode && (isLoadingProduct || isLoadingCategories)) {
    return (
      <div className='flex flex-col justify-center items-center py-12 space-y-4'>
        <Loader />
        <p className='text-gray-500 text-sm'>Loading product details...</p>
      </div>
    );
  }

  // Check if any thing is in progress
  const isFormDisabled = () => {
    return isCreating || isUpdating || isLoadingProduct || isLoadingCategories;
  };

  const renderButtonText = () => {
    if (isCreating || isUpdating) {
      return isEditMode ? 'Updating...' : 'Creating...';
    }
    return isEditMode ? 'Update Product' : 'Create Product';
  };

  return (
    <>
      <div className='relative'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <Input
              type='text'
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder='Enter product title'
              variant={errors.title ? 'error' : 'default'}
              label='Title *'
              disabled={isFormDisabled()}
            />
            {errors.title && <p className='text-red-500 text-sm mt-1'>{errors.title}</p>}
          </div>

          <div>
            <Input
              type='number'
              value={formData.price || ''}
              onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
              placeholder='Enter price'
              min='0'
              step='0.01'
              variant={errors.price ? 'error' : 'default'}
              label='Price *'
              disabled={isFormDisabled()}
            />
            {errors.price && <p className='text-red-500 text-sm mt-1'>{errors.price}</p>}
          </div>

          {/* Category */}
          <div>
            <Select
              options={
                categories?.map((category: Category) => ({
                  value: category.id,
                  label: category.name,
                })) || []
              }
              value={formData.categoryId || ''}
              onChange={(e) => handleInputChange('categoryId', e as number)}
              placeholder='Select a category'
              error={errors.categoryId ? String(errors.categoryId) : undefined}
              label='Category *'
              disabled={isFormDisabled()}
            />
          </div>

          {/* Description */}
          <div>
            <Textarea
              id='description'
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              placeholder='Enter product description'
              error={errors.description}
              label='Description *'
              disabled={isFormDisabled()}
            />
          </div>

          {/* Images */}
          <div>
            {formData.images.map((image, index) => (
              <div key={index} className='flex gap-2 mb-2 items-center justify-between'>
                <div className='w-full flex items-end justify-end gap-2'>
                  <Input
                    type='url'
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    placeholder='Enter image URL'
                    label='Product Images *'
                    variant={errors.images ? 'error' : 'default'}
                    disabled={isFormDisabled()}
                  />

                  <div className=''>
                    <Button
                      onClick={addImageField}
                      variant='outline'
                      disabled={isFormDisabled()}
                      type='button'
                    >
                      <Plus />
                    </Button>
                  </div>
                  {formData.images.length > 1 && (
                    <Button
                      onClick={() => removeImageField(index)}
                      variant='destructive'
                      disabled={isFormDisabled()}
                      type='button'
                    >
                      <Trash />
                    </Button>
                  )}
                </div>
              </div>
            ))}
            {errors.images && <p className='text-red-500 text-sm mt-1'>{errors.images}</p>}
          </div>

          {/* Submit Button */}
          <div className='pt-4'>
            <Button type='submit' variant='default' disabled={isFormDisabled()}>
              {renderButtonText()}
            </Button>
          </div>
        </form>
      </div>
      {/* Success Popover */}
      <Popover
        message={popoverMessage}
        isVisible={showSuccessPopover}
        variant='success'
        onClose={() => setShowSuccessPopover(false)}
      />

      {/* Error Popover */}
      <Popover
        message={popoverMessage}
        isVisible={showErrorPopover}
        variant='error'
        onClose={() => setShowErrorPopover(false)}
      />

      {/* API Error Popover */}
      <Popover
        message={
          createError
            ? getProductApiErrorMessage(createError)
            : updateError
            ? getProductApiErrorMessage(updateError)
            : 'Something went wrong!'
        }
        isVisible={Boolean(createError || updateError)}
        variant='error'
      />
    </>
  );
};

export default ProductAddAndEditForm;
