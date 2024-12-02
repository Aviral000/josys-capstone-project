import  { useLayoutEffect, useRef } from 'react'
import MemoizedHeader from '../components/header/Header.module';
import AdBannerModule from '../components/header/AdBanner.module';
import gsap from 'gsap';
import Checkout from '../components/checkout/Checkout.module';

const CheckoutPage = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cartRef = useRef<HTMLDivElement>(null);

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

        const animation2 = gsap.fromTo(
            cartRef.current,
            {
                y: 100,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 1,
                delay: 1
            }
        )

    return () => {
        animation.kill();
        animation2.kill()
    }
    }, [])

    return (
        <>
        <div ref={containerRef}>
            <AdBannerModule />
            <MemoizedHeader />
        </div>
        <div ref={cartRef}>
            <Checkout />
        </div>
        </>
    )
}

export default CheckoutPage