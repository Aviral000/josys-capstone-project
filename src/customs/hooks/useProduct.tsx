import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../services/Product.service';
import { Product } from '../../models/Product.type';

const useProduct = (productId?: string) => {
  const queryClient = useQueryClient();

  const {
    data: products,
    error: fetchError,
    isLoading: isFetchingProducts,
    isError: isFetchError,
  } = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });

  const {
    data: product,
    error: fetchErrorId,
    isLoading: isFetchingProduct,
    isError: isFetchErrorId,
  } = useQuery<Product, Error>({
    queryKey: ['product', productId],
    queryFn: () => getProductById(productId as string),
    enabled: !!productId,
  });

  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products']});
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Product> }) =>
      updateProduct(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products']});
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products']});
    },
  });

  return {
    products,
    isFetchingProducts,
    isFetchError,
    fetchError,
    product,
    isFetchingProduct,
    isFetchErrorId,
    fetchErrorId,
    createProduct: createProductMutation,
    updateProduct: updateProductMutation,
    deleteProduct: deleteProductMutation,
  };
};

export { useProduct };