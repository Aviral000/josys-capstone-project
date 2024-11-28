import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from '../../services/Category.service';
import { Category } from '../../models/Category.type';

const useCategory = (categoryId?: string) => {
  const queryClient = useQueryClient();

  // Fetch all categories
  const {
    data: categories,
    error: fetchError,
    isLoading: isFetchingCategories,
    isError: isFetchError,
  } = useQuery<Category[], Error>({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  });

  // Fetch a single category by ID
  const {
    data: category,
    error: fetchErrorById,
    isLoading: isFetchingCategory,
    isError: isFetchErrorById,
  } = useQuery<Category, Error>({
    queryKey: ['categories', categoryId],
    queryFn: () => getCategoryById(categoryId as string),
    enabled: !!categoryId,
  });

  // Create a category
  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  // Update a category
  const updateCategoryMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Category> }) =>
      updateCategory(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  // Delete a category
  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  return {
    categories,
    isFetchingCategories,
    isFetchError,
    fetchError,
    category,
    isFetchingCategory,
    isFetchErrorById,
    fetchErrorById,
    createCategory: createCategoryMutation,
    updateCategory: updateCategoryMutation,
    deleteCategory: deleteCategoryMutation,
  };
};

export { useCategory };
