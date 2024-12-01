import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllSubCategories,
  getSubCategoryById,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from "../../services/SubCategory.service";
import { SubType as SubCategory } from '../../models/Category.type'

const useSubCategory = (subCategoryId?: string) => {
  const queryClient = useQueryClient();

  const {
    data: subCategories,
    error: fetchError,
    isLoading: isFetchingSubCategories,
    isError: isFetchError,
  } = useQuery<SubCategory[], Error>({
    queryKey: ["subcategories"],
    queryFn: getAllSubCategories,
  });

  const {
    data: subCategory,
    error: fetchErrorById,
    isLoading: isFetchingSubCategory,
    isError: isFetchErrorById,
  } = useQuery<SubCategory, Error>({
    queryKey: ["subcategories", subCategoryId],
    queryFn: () => getSubCategoryById(subCategoryId as string),
    enabled: !!subCategoryId,
  });

  const createSubCategoryMutation = useMutation({
    mutationFn: createSubCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subcategories"] });
    },
  });

  const updateSubCategoryMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<SubCategory> }) =>
      updateSubCategory(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subcategories"] });
    },
  });

  const deleteSubCategoryMutation = useMutation({
    mutationFn: deleteSubCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subcategories"] });
    },
  });

  return {
    subCategories,
    isFetchingSubCategories,
    isFetchError,
    fetchError,
    subCategory,
    isFetchingSubCategory,
    isFetchErrorById,
    fetchErrorById,
    createSubCategory: createSubCategoryMutation,
    updateSubCategory: updateSubCategoryMutation,
    deleteSubCategory: deleteSubCategoryMutation,
  };
};

export { useSubCategory };
