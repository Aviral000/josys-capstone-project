import React from "react";
import back1 from '../../assets/main/bg-1.webp'
import RegSlider from "../../customs/components/RegSlider.module";
import { useBanner } from "../../customs/hooks/useBanner";
import loadinggif from '../../assets/others/loadinggif.gif';
import { useNavigate } from "react-router-dom";

const ResponsiveBanner: React.FC = () => {
    const {
        data,
        error,
        isLoading,
        isError
    } = useBanner();

    const navigate = useNavigate();

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

    const bannerData = Array.isArray(data) ? data[1] : data;
    const image = bannerData.image ? bannerData.image : back1;

  return (
    <div
      className="relative w-full h-[50vh] lg:h-[80vh] md:h-[60vh] bg-cover bg-center"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="flex justify-end relative z-10 mr-6">
        <RegSlider />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center px-8">
        <div className="text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{bannerData.heading}</h1>
          <p className="text-lg md:text-xl mb-2">{bannerData.discount}</p>
          <p className="text-sm md:text-base">{bannerData.description}</p>
        </div>
      </div>
      <div className="absolute bottom-8 left-8 space-x-4">
        <button onClick={() => navigate('/shop/men-clothing')} className="bg-white text-black px-5 py-2 text-sm md:text-base font-medium rounded-md shadow hover:bg-gray-200">
          SHOP MEN <span className="text-xl">→</span>
        </button>
        <button onClick={() => navigate('/shop/women-clothing')} className="bg-white text-black px-5 py-2 text-sm md:text-base font-medium rounded-md shadow hover:bg-gray-200">
          SHOP WOMEN <span className="text-xl">→</span>
        </button>
        <button onClick={() => navigate('/shop/kids-clothing')} className="bg-white text-black px-5 py-2 text-sm md:text-base font-medium rounded-md shadow hover:bg-gray-200">
          SHOP KIDS <span className="text-xl">→</span>
        </button>
      </div>
    </div>
  );
};

export default ResponsiveBanner;
