import React from "react";
import back6 from '../../assets/main/bg-6.webp'
import { useBanner } from "../../customs/hooks/useBanner";
import loadinggif from '../../assets/others/loadinggif.gif';
import { useNavigate } from "react-router-dom";

const MiddleBanner: React.FC = () => {
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

    const bannerData = Array.isArray(data) ? data[2] : data;
    const image = bannerData.image ? bannerData.image : back6;

  return (
    <div
      className="relative w-full h-[60vh] lg:h-[135vh] md:h-[100vh] bg-cover bg-center"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center px-8 py-4">
        <div className="text-white max-w-[70%] lg:max-w-[40%]">
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-4 break-words">
            {bannerData.heading}
          </h1>
          <p className="text-lg md:text-xl mb-2">{bannerData.discount}</p>
          <p className="text-sm md:text-base">{bannerData.description}</p>
        </div>
      </div>
      <div className="absolute bottom-8 left-8 space-x-4">
        <button
          onClick={() => navigate('/product/321')}
          className="bg-white text-black px-5 py-2 text-sm md:text-base font-medium rounded-md shadow hover:bg-gray-200"
        >
          SHOP Now <span className="text-xl">→</span>
        </button>
      </div>
    </div>
  );
};

export default MiddleBanner;
