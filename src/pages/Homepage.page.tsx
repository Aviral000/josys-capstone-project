import React, { useLayoutEffect, useRef } from 'react'
import MemoizedHeader from '../components/header/Header.module'
import MemoizedBanner from '../components/header/AdBanner.module';
import gsap from 'gsap';
import ResponsiveBanner from '../components/advertisement/ResponsiveBanner.module';
import ProductCarousel from '../customs/components/ProCarousel.module';
import SaleCarousel from '../customs/components/SaleCarousel.module';
import MiddleBanner from '../components/advertisement/MiddleBanner.module';
import LimitedStock from '../customs/components/LimitedStock.module';
import VideoAA from '../components/videopromo/VideoAA.module';
import UpperFooter from '../components/footer/UpperFooter.module';
import MiddleFooter from '../components/footer/MiddleFooter.module';
import LowerFooter from '../components/footer/LowerFooter.module';

const Homepage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const animation = gsap.fromTo(
        containerRef.current,
        {
            y: -50,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 1
        }
    )

    return () => {
        animation.kill();
    }
}, [])

  return (
    <>
      <div ref={containerRef}>
        <MemoizedBanner />
        <MemoizedHeader />
      </div>
      <div>
        <ResponsiveBanner />
      </div>
      <div>
        <SaleCarousel />
        <ProductCarousel />
      </div>
      <div>
        <MiddleBanner />
      </div>
      <div>
        <LimitedStock />
      </div>
      <div>
        <VideoAA />
      </div>
      <div>
        <UpperFooter />
        <MiddleFooter />
        <LowerFooter />
      </div>
    </>
  )
}

export default Homepage;