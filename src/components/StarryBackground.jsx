import React, { useEffect, useRef } from 'react';

const StarryBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let mouseX = 0;
    let mouseY = 0;
    let shakeIntensity = 0;
    let lastShakeTime = 0;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 0.2 + 0.1,
      velocityX: 0,
      velocityY: 0
    }));

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleDeviceMotion = (e) => {
      const { accelerationIncludingGravity } = e;
      if (accelerationIncludingGravity) {
        const currentTime = Date.now();
        const timeDiff = currentTime - lastShakeTime;
        
        if (timeDiff > 100) {
          const acceleration = Math.sqrt(
            accelerationIncludingGravity.x ** 2 +
            accelerationIncludingGravity.y ** 2 +
            accelerationIncludingGravity.z ** 2
          );
          
          if (acceleration > 15) {
            shakeIntensity = Math.min(shakeIntensity + 0.1, 1);
            lastShakeTime = currentTime;
          }
        }
        
        mouseX = (accelerationIncludingGravity.x / 10) * 2;
        mouseY = (accelerationIncludingGravity.y / 10) * 2;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('devicemotion', handleDeviceMotion);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';

      shakeIntensity *= 0.95;

      stars.forEach(star => {
        const targetVelocityX = star.speed * mouseX + (Math.random() - 0.5) * shakeIntensity * 10;
        const targetVelocityY = star.speed * mouseY + (Math.random() - 0.5) * shakeIntensity * 10;

        star.velocityX += (targetVelocityX - star.velocityX) * 0.1;
        star.velocityY += (targetVelocityY - star.velocityY) * 0.1;

        star.x += star.velocityX;
        star.y += star.velocityY;

        if (star.x > canvas.width) star.x = 0;
        if (star.x < 0) star.x = canvas.width;
        if (star.y > canvas.height) star.y = 0;
        if (star.y < 0) star.y = canvas.height;

        const glowIntensity = Math.min(Math.abs(star.velocityX) + Math.abs(star.velocityY), 2);
        const glow = glowIntensity * 10;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size + glow, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.1 * glowIntensity})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('devicemotion', handleDeviceMotion);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 0 }} />;
};

export default StarryBackground;