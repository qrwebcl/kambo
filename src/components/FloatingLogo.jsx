import React, { useEffect, useRef } from 'react';

const FloatingLogo = () => {
  const logoRef = useRef(null);

  useEffect(() => {
    const animateLogo = () => {
      if (logoRef.current) {
        const time = Date.now() * 0.001;
        const yOffset = Math.sin(time) * 5;
        logoRef.current.style.transform = `translate(-50%, -40%) translateY(${yOffset}px)`;
      }
      requestAnimationFrame(animateLogo);
    };
    const animationFrame = requestAnimationFrame(animateLogo);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div
      ref={logoRef}
      style={{
        position: 'absolute',
        top: '60%',
        left: '50%',
        transform: 'translate(-50%, -40%)',
        width: '250px',
        height: '250px',
        backgroundImage: 'url("https://imgur.com/DeZOYxV.png")',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: '0.4',
        transition: 'transform 0.3s ease-out',
        zIndex: 1,
        filter: 'drop-shadow(0 0 8px rgba(127, 255, 0, 0.7))',
      }}
    />
  );
};

export default FloatingLogo;