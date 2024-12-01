import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useEntity = <T, TId = string>(
  entityKey: string,
  fetchAllFn: () => Promise<T[]>,
  fetchByIdFn: (id: TId) => Promise<T>,
  createFn: (data: Omit<T, 'id'>) => Promise<T>,
  updateFn: (id: TId, updates: Omit<T, 'id'>) => Promise<T>,
  deleteFn: (id: TId) => Promise<void>,
  id?: TId
) => {
  const queryClient = useQueryClient();

  const {
    data: entities,
    error: fetchError,
    isLoading: isFetchingEntities,
    isError: isFetchError,
  } = useQuery<T[], Error>({
    queryKey: [entityKey],
    queryFn: fetchAllFn,
  });

  const {
    data: entity,
    error: fetchErrorId,
    isLoading: isFetchingEntity,
    isError: isFetchErrorId,
  } = useQuery<T, Error>({
    queryKey: [entityKey, 'id'],
    queryFn: () => fetchByIdFn(id as TId),
    enabled: !!entityKey,
  });

  const createMutation = useMutation({
    mutationFn: createFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [entityKey] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: TId; updates: Omit<T, 'id'> }) =>
      updateFn(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [entityKey] });
      queryClient.invalidateQueries({ queryKey: [entityKey, variables.id] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [entityKey] });
    },
  });

  return {
    entities,
    isFetchingEntities,
    isFetchError,
    fetchError,
    entity,
    isFetchingEntity,
    isFetchErrorId,
    fetchErrorId,
    create: createMutation,
    update: updateMutation,
    delete: deleteMutation,
  };
};
