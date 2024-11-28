import React, { memo, useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useProduct } from '../hooks/useProduct';
import { Link } from 'react-router-dom';
import loadingGif from '../../assets/others/loadinggif.gif';
import { Product } from '../../models/Product.type';

const SaleCarousel: React.FC = () => {
  const { products = [], isFetchingProducts, fetchError } = useProduct();
  const [filteredProductForSale, setFilteredProductForSale] = useState<Product[]>([]);

  useEffect(() => {
    if(products.length > 0) {
      const saleProduct = products?.filter((product) => product.discount >= 40);
      setFilteredProductForSale(saleProduct!);
    }
  }, [products])

  if (isFetchingProducts) return (<><img src={loadingGif} alt='loading-gif' className="w-20 h-20" /></>);
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
    <div>
      <h1 className='m-4 mt-8 text-4xl font-serif font-bold'>Black Friday Steals You’ll Love!</h1>
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={3000}
        containerClass="carousel-container"
        itemClass="carousel-item"
      >
        {filteredProductForSale?.slice(0,6).map((product) => (
          <div
            key={product.id}
            className="relative m-4 group mt-8"
          >
            <img
              src={product.images[0]}
              alt={product.productName}
              className="w-full h-60 object-cover rounded-md"
            />
            <Link to={`/product/${product.id}`}>
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-4">
                <h3 className="text-lg font-semibold">{product.productName}</h3>
                <p className="text-sm">{product.discount}% OFF</p>
                <p className="mt-2 text-lg">${(product.cost - ((product.cost)*(product.discount))/100)}</p>
              </div>
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default memo(SaleCarousel);
