import  { useLayoutEffect, useRef } from 'react'
import MemoizedHeader from '../components/header/Header.module';
import AdBannerModule from '../components/header/AdBanner.module';
import ResponsiveBanner from '../components/advertisement/ResponsiveBanner.module';
import gsap from 'gsap';
import KidsCategoryModule from '../components/kidsclothes/KidsCategory.module';
import KidsSection from '../components/kidsclothes/KidsSection.module';
import LowerFooterModule from '../components/footer/LowerFooter.module';

const KidsClothing = () => {
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
                <KidsCategoryModule />
            </div>
            <div>
                <KidsSection />
                <LowerFooterModule />
            </div>
        </>
    )
}

export default KidsClothing