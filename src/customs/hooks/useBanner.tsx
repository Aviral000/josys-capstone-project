import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBannerDetails, replaceBanner, resetBanner } from '../../services/AdBanner.service';
import { AdBanner } from '../../models/AdBanner.type';

export const useBanner = () => {
    const queryClient = useQueryClient();

    const { data, error, isLoading, isError } = useQuery({
        queryKey: ['banner'],
        queryFn: getBannerDetails,
    });

    const mutation = useMutation({
        mutationFn: ({ id, bannerData }: { id: number; bannerData: Omit<AdBanner, 'id'> }) => 
            replaceBanner(id, bannerData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['banner'] });
        },
    });

    const resetBannerMutation = useMutation({
        mutationFn: resetBanner,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['banner'] });
        },
    })

    return {
        data,
        error,
        isLoading,
        isError,
        updateBanner: mutation.mutate,
        isUpdating: mutation.isPending,
        updateError: mutation.error,
        resetBanner: resetBannerMutation.mutate,
        isResetting: resetBannerMutation.isPending,
        resetError: resetBannerMutation.error,
    };
};