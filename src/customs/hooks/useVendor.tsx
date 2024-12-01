import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Vendor } from '../../models/Vendor.type';
import { getAllVendors, getVendorById, createVendor, deleteVendor, updateVendor } from '../../services/Vendor.service';

const useVendor = (vendorId?: string) => {
  const queryClient = useQueryClient();

  const {
    data: vendors,
    error: fetchError,
    isLoading: isFetchingVendors,
    isError: isFetchError,
  } = useQuery<Vendor[], Error>({
    queryKey: ['vendors'],
    queryFn: getAllVendors,
  });

  const {
    data: vendor,
    error: fetchErrorId,
    isLoading: isFetchingVendor,
    isError: isFetchErrorId,
  } = useQuery<Vendor, Error>({
    queryKey: ['vendors', vendorId],
    queryFn: () => getVendorById(vendorId as string),
    enabled: !!vendorId,
  });

  const createVendorMutation = useMutation({
    mutationFn: createVendor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
    },
  });

  const updateVendorMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Omit<Vendor, 'id'> }) =>
      updateVendor(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
      queryClient.invalidateQueries({ queryKey: ['vendors', variables.id] });
    },
  });

  const deleteVendorMutation = useMutation({
    mutationFn: deleteVendor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
    },
  });

  return {
    vendors,
    isFetchingVendors,
    isFetchError,
    fetchError,
    vendor,
    isFetchingVendor,
    isFetchErrorId,
    fetchErrorId,
    createVendor: createVendorMutation,
    updateVendor: updateVendorMutation,
    deleteVendor: deleteVendorMutation,
  };
};

export { useVendor };
