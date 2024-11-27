import React, { useLayoutEffect, useRef } from 'react'
import MemoizedHeader from '../components/header/Header.module'
import MemoizedBanner from '../components/header/AdBanner.module';
import RegSlider from '../customs/components/RegSlider.module';
import gsap from 'gsap';
import ResponsiveBanner from '../components/advertisement/ResponsiveBanner.module';

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
    <div ref={containerRef}>
        <MemoizedBanner />
        <MemoizedHeader />
        <div className='flex justify-end relative'>
          <RegSlider />
        </div>
        <div className='absolute'>
          <ResponsiveBanner />
        </div>
    </div>
  )
}

export default Homepage;