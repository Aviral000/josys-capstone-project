import React, { memo, useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useProduct } from '../hooks/useProduct';
import { Link } from 'react-router-dom';
import loadingGif from '../../assets/others/loadinggif.gif';
import { Product } from '../../models/Product.type';

const NewestStock: React.FC = () => {
  const { products = [], isFetchingProducts, fetchError } = useProduct();
  const [filteredProductForSale, setFilteredProductForSale] = useState<Product[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      const saleProduct = products.filter((product) => product.stock <= 20);
      setFilteredProductForSale(saleProduct);
    }
  }, [products]);

  if (isFetchingProducts) {
    return (
      <div className="flex justify-center items-center">
        <img src={loadingGif} alt="Loading..." className="w-20 h-20" />
      </div>
    );
  }

  if (fetchError) {
    return <p className="text-red-500">Error fetching products: {fetchError.message}</p>;
  }

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
    <div className="p-4">
      <h1 className="mb-8 text-2xl md:text-4xl font-serif font-bold text-center">
        Limited Stock Left, Hurry up!!!
      </h1>
      {filteredProductForSale.length > 0 ? (
        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={3000}
          containerClass="carousel-container"
          itemClass="carousel-item"
        >
          {filteredProductForSale.slice(0, 6).map((product) => (
            <div
              key={product.id}
              className="relative m-4 group"
            >
              <img
                src={product.images[0] || 'https://via.placeholder.com/300'} // Fallback image
                alt={product.productName}
                className="w-full h-60 object-cover rounded-md"
              />
              <Link to={`/product/${product.id}`}>
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-4">
                  <h3 className="text-lg font-semibold">{product.productName}</h3>
                  <p className="text-sm">Stock: {product.stock} Left</p>
                  <p className="mt-2 text-lg">
                    Cost: $
                    {(
                      product.cost -
                      (product.cost * product.discount) / 100
                    ).toFixed(2)}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </Carousel>
      ) : (
        <p className="text-center text-lg">No limited stock products available right now.</p>
      )}
    </div>
  );
};

export default memo(NewestStock);
