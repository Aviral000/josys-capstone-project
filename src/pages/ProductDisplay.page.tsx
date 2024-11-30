import  { useLayoutEffect, useRef } from 'react'
import MemoizedHeader from '../components/header/Header.module';
import AdBannerModule from '../components/header/AdBanner.module';
import gsap from 'gsap';
import AllProduct from '../components/productdisplay/AllProduct.module';
import UpperFooterModule from '../components/footer/UpperFooter.module';
import MiddleFooterModule from '../components/footer/MiddleFooter.module';
import LowerFooterModule from '../components/footer/LowerFooter.module';

const ProductDisplayPage = () => {
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
            <AllProduct />
        </div>
        <div>
            <UpperFooterModule />
            <MiddleFooterModule />
            <LowerFooterModule />
        </div>
        </>
    )
}

export default ProductDisplayPage