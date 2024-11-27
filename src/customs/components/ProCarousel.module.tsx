import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useProduct } from '../hooks/useProduct';

const ProductCarousel = () => {
  const { products, isFetchingProducts, fetchError } = useProduct();

  if (isFetchingProducts) return <p>Loading products...</p>;
  if (fetchError) return <p>Error fetching products: {fetchError.message}</p>;

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel
      responsive={responsive}
      infinite
      autoPlay
      autoPlaySpeed={3000}
      containerClass="carousel-container"
      itemClass="carousel-item"
    >
      {products?.map((product) => (
        <div
          key={product.id}
          className="relative m-4 group mt-8"
        >
          <img
            src={product.images[0]}
            alt={product.productName}
            className="w-full h-60 object-cover rounded-md"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-4">
            <h3 className="text-lg font-semibold">{product.productName}</h3>
            <p className="text-sm">{product.productDesc}</p>
            <p className="mt-2 text-lg">${product.cost}</p>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
