import React, { useLayoutEffect, useRef } from 'react'
import MemoizedHeader from '../components/header/Header.module';
import AdBannerModule from '../components/header/AdBanner.module';
import ResponsiveBanner from '../components/advertisement/ResponsiveBanner.module';
import gsap from 'gsap';
import WomenCategoryModule from '../components/womenclothes/WomenCategory.module';
import WomenSection from '../components/womenclothes/WomenSection.module';
import LowerFooterModule from '../components/footer/LowerFooter.module';

const WomenClothing = () => {
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
                <ResponsiveBanner />
            </div>
            <div>
                <WomenCategoryModule />
            </div>
            <div>
                <WomenSection />
                <LowerFooterModule />
            </div>
        </>
    )
}

export default WomenClothing