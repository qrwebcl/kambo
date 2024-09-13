import React, { useEffect, useRef } from 'react';

const FloatingLogo = () => {
  const logoRef = useRef(null);

  useEffect(() => {
    const animateLogo = () => {
      if (logoRef.current) {
        const time = Date.now() * 0.001;
        const yOffset = Math.sin(time) * 5;
        logoRef.current.style.transform = `translate(-50%, -50%) translateY(${yOffset}px)`;
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
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '300px',
        height: '300px',
        backgroundImage: 'url("https://imgur.com/DeZOYxV.png")',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: '0.3',
        transition: 'transform 0.3s ease-out',
        zIndex: 1,
        filter: 'drop-shadow(0 0 5px rgba(127, 255, 0, 0.5))',
      }}
    />
  );
};

export default FloatingLogo;