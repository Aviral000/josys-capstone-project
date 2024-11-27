import React from 'react';
import loadinggif from '../../assets/others/loadinggif.gif';
import { useBanner } from '../../customs/hooks/useBanner';

const AdvBanner: React.FC = () => {
    const { 
        data, 
        error, 
        isLoading, 
        isError
    } = useBanner();

    if (isLoading) {
        return (
            <div className="w-full flex justify-center">
                <img src={loadinggif} alt="Loading..." className="w-8 h-8" />
            </div>
        );
    }

    if (isError) {
        return <p>Error: {error?.message}</p>;
    }

    const bannerData = Array.isArray(data) ? data[0] : data;

    return (
        <>
            {bannerData.description && (
                <div className="bg-zinc-950 text-slate-400 w-full text-center font-serif">
                    {bannerData.description} {bannerData.discount}
                </div>
            )}
        </>
    );
};

export default React.memo(AdvBanner);