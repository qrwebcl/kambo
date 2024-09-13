import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";

const StarryBackground = () => {
  const canvasRef = useRef(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let mouseX = 0;
    let mouseY = 0;
    let shakeIntensity = 0;
    let lastShakeTime = 0;
    let isUsingGyroscope = false;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 0.2 + 0.1,
      velocityX: 0,
      velocityY: 0,
      trail: []
    }));

    const handleMouseMove = (e) => {
      if (!isUsingGyroscope) {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      }
    };

    const handleDeviceOrientation = (e) => {
      if (e.gamma && e.beta) {
        isUsingGyroscope = true;
        mouseX = (e.gamma / 45) * 2; // Normalize to [-2, 2] range
        mouseY = (e.beta / 45) * 2;
      }
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
        
        if (!isUsingGyroscope) {
          mouseX = (accelerationIncludingGravity.x / 10) * 2;
          mouseY = (accelerationIncludingGravity.y / 10) * 2;
        }
      }
    };

    const requestMotionPermission = () => {
      if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
          .then(permissionState => {
            if (permissionState === 'granted') {
              setPermissionGranted(true);
              window.addEventListener('devicemotion', handleDeviceMotion);
              window.addEventListener('deviceorientation', handleDeviceOrientation);
            }
          })
          .catch(console.error);
      } else {
        // For non-iOS 13+ devices, assume permission is granted
        setPermissionGranted(true);
        window.addEventListener('devicemotion', handleDeviceMotion);
        window.addEventListener('deviceorientation', handleDeviceOrientation);
      }
    };

    if (permissionGranted) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('devicemotion', handleDeviceMotion);
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    } else {
      requestMotionPermission();
    }

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

        // Add current position to the trail
        star.trail.push({ x: star.x, y: star.y });
        if (star.trail.length > 5) star.trail.shift();

        // Draw trail
        ctx.beginPath();
        ctx.moveTo(star.trail[0].x, star.trail[0].y);
        star.trail.forEach((point, index) => {
          const alpha = index / star.trail.length;
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.3})`;
          ctx.lineTo(point.x, point.y);
        });
        ctx.stroke();

        // Draw star
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
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      window.removeEventListener('devicemotion', handleDeviceMotion);
      window.removeEventListener('resize', handleResize);
    };
  }, [permissionGranted]);

  const requestPermission = () => {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      DeviceMotionEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === 'granted') {
            setPermissionGranted(true);
          }
        })
        .catch(console.error);
    } else {
      // For non-iOS 13+ devices, assume permission is granted
      setPermissionGranted(true);
    }
  };

  return (
    <>
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 0 }} />
      {!permissionGranted && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Button onClick={requestPermission} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Activar experiencia inmersiva
          </Button>
        </div>
      )}
    </>
  );
};

export default StarryBackground;