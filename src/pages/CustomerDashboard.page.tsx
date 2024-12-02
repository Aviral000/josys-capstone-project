import React, { useLayoutEffect, useRef } from 'react'
import CustomerProfile from '../components/customerProfile/CustomerProfile.module';
import gsap from 'gsap';

const CustomerProfilePage: React.FC = () => {
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
      animation.kill();
    }
  }, [])

  return (
    <div ref={containerRef}>
      <CustomerProfile />
    </div>
  )
}

export default CustomerProfilePage;