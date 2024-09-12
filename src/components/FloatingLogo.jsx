import React, { useEffect, useRef, useState } from 'react';

const FloatingLogo = () => {
  const logoRef = useRef(null);
  const [oscillationSpeed, setOscillationSpeed] = useState(1);

  useEffect(() => {
    const animateLogo = () => {
      if (logoRef.current) {
        const time = Date.now() * 0.001 * oscillationSpeed;
        const yOffset = Math.sin(time) * 5;
        logoRef.current.style.transform = `translate(-50%, -50%) translateY(${yOffset}px)`;
      }
      requestAnimationFrame(animateLogo);
    };
    const animationFrame = requestAnimationFrame(animateLogo);
    return () => cancelAnimationFrame(animationFrame);
  }, [oscillationSpeed]);

  const handleLogoInteraction = (e) => {
    if (!logoRef.current) return;
    
    const logo = logoRef.current;
    const rect = logo.getBoundingClientRect();
    const y = e.clientY - rect.top;
    
    const newSpeed = 1 + Math.abs((y / rect.height - 0.5) * 2);
    setOscillationSpeed(newSpeed);
  };

  const resetLogoPosition = () => {
    setOscillationSpeed(1);
  };

  return (
    <div
      id="floating-logo"
      ref={logoRef}
      onMouseMove={handleLogoInteraction}
      onMouseLeave={resetLogoPosition}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '150px',
        height: '150px',
        backgroundImage: 'url("https://imgur.com/IZJhTNZ")',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: '0.15',
        transition: 'transform 0.3s ease-out',
        cursor: 'pointer',
        zIndex: 1,
        animation: 'neonGlow 2s ease-in-out infinite'
      }}
    />
  );
};

export default FloatingLogo;