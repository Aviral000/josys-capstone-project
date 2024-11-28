import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

const SubCategoryCarousel: React.FC<{ products: any[] }> = ({ products }) => {
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
      {products.map((product) => (
        <Link to={`/product/${product.id}`}>
          <div
            key={product.id}
            className="relative m-4 group shadow-md rounded-md overflow-hidden"
          >
            <img
              src={product.images[0] || "https://via.placeholder.com/300"}
              alt={product.productName}
              className="w-full h-60 object-cover transition-transform transform group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-4">
              <h3 className="text-lg font-semibold">{product.productName}</h3>
              <p className="text-sm">{product.productDesc}</p>
              <p className="mt-2 text-lg">₹{product.cost}</p>
              <p className="text-sm mt-2">
                Discounted Price: ₹
                {(product.cost - (product.cost * product.discount) / 100).toFixed(2)}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </Carousel>
  );
};

export default SubCategoryCarousel;
