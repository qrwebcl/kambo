import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { Instagram, MapPin, Clock, Phone } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Index = () => {
  const [selectedStore, setSelectedStore] = useState(null);
  const logoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    document.body.style.backgroundColor = '#000000';
    document.body.style.color = 'white';
    document.body.style.fontFamily = 'Roboto, Arial, sans-serif';
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
      document.body.style.fontFamily = '';
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = [];
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 3 + 1
      });
    }

    const shootingStars = [];
    const createShootingStar = () => {
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: 0,
        length: Math.random() * 80 + 10,
        speed: Math.random() * 10 + 5,
        size: Math.random() * 2 + 1
      });
    };

    setInterval(createShootingStar, 3000);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';

      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        star.y += star.speed;
        if (star.y > canvas.height) star.y = 0;
      });

      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      shootingStars.forEach((star, index) => {
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x + star.length, star.y + star.length);
        ctx.lineWidth = star.size;
        ctx.stroke();
        star.x += star.speed;
        star.y += star.speed;
        if (star.x > canvas.width || star.y > canvas.height) {
          shootingStars.splice(index, 1);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleStoreSelect = (store) => {
    setSelectedStore(store);
  };

  const handleCopyToClipboard = () => {
    const text = `Kambo Grow & Smart Shop
Dirección: 123 Calle Principal, Ciudad, País
Horarios: Lun - Sáb: 10:30 - 19:30, Dom: Cerrado
Teléfono: +1 234 567 890
Email: info@kambogrow.com`;
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Datos copiados al portapapeles');
    });
  };

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
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-8 bg-black text-white">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 0 }}></canvas>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .store-button, .social-button {
          text-decoration: none;
          color: #000000;
          padding: 10px 20px;
          margin: 5px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 25px;
          font-weight: bold;
          text-transform: uppercase;
          background-color: #4CAF50;
          border: 2px solid #4CAF50;
          box-shadow: 0 0 15px rgba(76, 175, 80, 0.3);
          transition: all 0.2s ease;
          font-size: 0.8rem;
        }
        .store-button {
          width: 100%;
        }
        .store-button:hover, .social-button:hover {
          background-color: #45a049;
          box-shadow: 0 0 20px rgba(76, 175, 80, 0.5);
        }
        .store-button:active, .social-button:active {
          transform: scale(0.98);
          background-color: #4CAF50;
        }
        #floating-logo {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 150px;
          height: 150px;
          background-image: url('https://ozeta.cl/wp-content/sabai/File/files/l_556ef36bb393009069eb500ba3087112.png');
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0.15;
          transition: transform 0.3s ease-out;
          cursor: pointer;
          z-index: 1;
        }
        @media (min-width: 640px) {
          .store-button, .social-button {
            font-size: 1rem;
            padding: 12px 25px;
          }
          #floating-logo {
            width: 300px;
            height: 300px;
          }
        }
      `}</style>

      <div
        id="floating-logo"
        ref={logoRef}
        onMouseMove={handleLogoInteraction}
        onMouseLeave={resetLogoPosition}
      ></div>

      {!selectedStore ? (
        <div className="text-center relative z-10 w-full max-w-md" style={{ animation: 'fadeIn 1.5s forwards' }}>
          <h1 className="text-2xl sm:text-4xl mb-6 sm:mb-8 font-bold text-shadow">Kambo Grow & Smart Shop 🐸</h1>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button className="store-button w-full sm:w-48 bg-[#4CAF50] text-[#000000] hover:bg-[#45a049]" onClick={() => handleStoreSelect('main')}>
              Explorar Tienda
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center w-full max-w-md p-4 relative z-10" style={{ animation: 'fadeIn 1.5s forwards' }}>
          <h2 className="text-xl sm:text-3xl mb-4 sm:mb-6 font-bold">Kambo Grow & Smart Shop 🐸</h2>
          <div className="mb-6 text-left">
            <h3 className="text-lg sm:text-xl mb-3 sm:mb-4 font-semibold">Información de Contacto</h3>
            <p className="text-xs sm:text-base whitespace-pre-line">
              Dirección: 123 Calle Principal, Ciudad, País<br />
              Horarios: Lun - Sáb: 10:30 - 19:30, Dom: Cerrado<br />
              Teléfono: +1 234 567 890<br />
              Email: info@kambogrow.com
            </p>
            <Button className="social-button mt-4 w-full text-xs sm:text-base bg-[#4CAF50] text-[#000000] hover:bg-[#45a049]" onClick={handleCopyToClipboard}>
              Copiar datos de contacto
            </Button>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-2 mb-6">
            <Button 
              className="social-button text-xs sm:text-base bg-[#4CAF50] text-[#000000] hover:bg-[#45a049]"
              onClick={() => window.open('https://wa.link/ud24fn', '_blank')}
            >
              <Phone className="mr-2" /> WhatsApp
            </Button>
            <Button 
              className="social-button text-xs sm:text-base bg-[#4CAF50] text-[#000000] hover:bg-[#45a049]"
              onClick={() => window.open('https://www.instagram.com/kambogrow/', '_blank')}
            >
              <Instagram className="mr-2" /> Instagram 🐸
            </Button>
            <Button
              className="social-button text-xs sm:text-base bg-[#4CAF50] text-[#000000] hover:bg-[#45a049]"
              onClick={() => toast.info("Lun - Sáb: 10:30 - 19:30\nDomingo: Cerrado")}
            >
              <Clock className="mr-2" /> Horarios
            </Button>
            <Button
              className="social-button text-xs sm:text-base bg-[#4CAF50] text-[#000000] hover:bg-[#45a049]"
              onClick={() => window.open('https://www.google.com/maps?client=opera-gx&hs=TwT&sca_esv=b3b81d1d30ec7baa&output=search&q=kambo+grow+shop+ubicación&source=lnms&fbs=AEQNm0CbCVgAZ5mWEJDg6aoPVcBgy3z6G8XHXm5Ah4uwilWjRJeyTIczQNFLgz4BekoSgG4R3EvpFPQySx_mlSkGosXzKPW74IKUGm4uFRYtXAdKcveLTkbZEWxoccbKczIixf_JENIYySqOJN3OdO5W224NpPgzE0sbSu77tk65G6QsVN19Sl9-S3fQR2rf18N-vCozZtQ4ZKotfmVOyQm11cU_PfYXow&entry=mc&ved=1t:200715&ictx=111', '_blank')}
            >
              <MapPin className="mr-2" /> Ubicación
            </Button>
          </div>
        </div>
      )}

      <Button
        className="absolute top-4 right-4 bg-[#4CAF50] text-[#000000] hover:bg-[#45a049] px-2 py-1 sm:px-4 sm:py-2 rounded-full transition-all z-20 text-xs sm:text-base"
        onClick={() => setSelectedStore(null)}
      >
        Volver al Inicio
      </Button>
    </div>
  );
};

export default Index;