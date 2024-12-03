import  { useLayoutEffect, useRef } from 'react'
import MemoizedHeader from '../components/header/Header.module';
import AdBannerModule from '../components/header/AdBanner.module';
import gsap from 'gsap';
import Cart from '../components/cart/Cart.module';

const CartPage = () => {
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
    );

    return () => {
        animation.kill()
    }
}, [])

    return (
        <>
        <div ref={containerRef}>
            <AdBannerModule />
            <MemoizedHeader />
        </div>
        <div>
            <Cart />
        </div>
        </>
    )
}

export default CartPage