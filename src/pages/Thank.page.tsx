import  { useLayoutEffect, useRef } from 'react'
import MemoizedHeader from '../components/header/Header.module';
import gsap from 'gsap';
import ThankYou from '../components/thankyou/ThankYou.module';

const ThankPage = () => {
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
            <MemoizedHeader />
        </div>
        <div>
            <ThankYou />
        </div>
        </>
    )
}

export default ThankPage