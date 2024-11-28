import React, { memo, useLayoutEffect, useRef } from 'react'
import MemoizedHeader from '../components/header/Header.module';
import AdBannerModule from '../components/header/AdBanner.module';
import gsap from 'gsap';
import ProductDetail from '../components/products/ProductDetail.module';

const Product = () => {
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
            <AdBannerModule />
            <MemoizedHeader />
        </div>
        <div>
            <ProductDetail />
        </div>
        </>
    )
}

export default memo(Product)