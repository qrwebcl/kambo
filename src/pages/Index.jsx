import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { Instagram, MapPin, Clock, Phone } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Index = () => {
  const [selectedStore, setSelectedStore] = useState(null);
  const logoRef = useRef(null);

  useEffect(() => {
    document.body.style.backgroundColor = '#232323';
    document.body.style.color = 'white';
    document.body.style.fontFamily = 'Roboto, Arial, sans-serif';
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
      document.body.style.fontFamily = '';
    };
  }, []);

  const handleStoreSelect = (store) => {
    setSelectedStore(store);
  };

  const handleCopyToClipboard = () => {
    const text = `Kambo Grow & Smart Shop
Dirección: 123 Calle Principal, Ciudad, País
Horarios: Lun - Sáb: 10:00 - 20:00
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
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-8 bg-[#232323] text-white">
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .store-button, .social-button {
          text-decoration: none;
          color: #232323;
          padding: 10px 20px;
          margin: 5px;
          display: inline-block;
          border-radius: 25px;
          font-weight: bold;
          text-transform: uppercase;
          background-color: #ffca28;
          border: 2px solid #ffca28;
          box-shadow: 0 0 15px rgba(255, 202, 40, 0.3);
          transition: all 0.2s ease;
          font-size: 0.8rem;
        }
        .store-button {
          width: 100%;
        }
        .store-button:hover, .social-button:hover {
          background-color: #ffd54f;
          box-shadow: 0 0 20px rgba(255, 202, 40, 0.5);
        }
        .store-button:active, .social-button:active {
          transform: scale(0.98);
          background-color: #ffca28;
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
          z-index: -1;
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
            <Button className="store-button w-full sm:w-48 bg-[#ffca28] text-[#232323] hover:bg-[#ffd54f]" onClick={() => handleStoreSelect('main')}>
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
              Horarios: Lun - Sáb: 10:00 - 20:00<br />
              Teléfono: +1 234 567 890<br />
              Email: info@kambogrow.com
            </p>
            <Button className="social-button mt-4 w-full text-xs sm:text-base bg-[#ffca28] text-[#232323] hover:bg-[#ffd54f]" onClick={handleCopyToClipboard}>
              Copiar datos de contacto
            </Button>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-2 mb-6">
            <Button 
              className="social-button text-xs sm:text-base bg-[#ffca28] text-[#232323] hover:bg-[#ffd54f]"
              onClick={() => window.open('https://wa.link/ud24fn', '_blank')}
            >
              <Phone className="mr-2" /> WhatsApp
            </Button>
            <Button 
              className="social-button text-xs sm:text-base bg-[#ffca28] text-[#232323] hover:bg-[#ffd54f]"
              onClick={() => window.open('https://instagram.com', '_blank')}
            >
              <Instagram className="mr-2" /> Instagram 🐸
            </Button>
            <Button
              className="social-button text-xs sm:text-base bg-[#ffca28] text-[#232323] hover:bg-[#ffd54f]"
              onClick={() => toast.info("Lun - Sáb: 10:00 - 20:00\nDomingo: Cerrado")}
            >
              <Clock className="mr-2" /> Horarios
            </Button>
            <Button
              className="social-button text-xs sm:text-base bg-[#ffca28] text-[#232323] hover:bg-[#ffd54f]"
              onClick={() => window.open('https://maps.google.com', '_blank')}
            >
              <MapPin className="mr-2" /> Ubicación
            </Button>
          </div>
        </div>
      )}

      <Button
        className="absolute top-4 right-4 bg-[#ffca28] text-[#232323] hover:bg-[#ffd54f] px-2 py-1 sm:px-4 sm:py-2 rounded-full transition-all z-20 text-xs sm:text-base"
        onClick={() => setSelectedStore(null)}
      >
        Volver al Inicio
      </Button>
    </div>
  );
};

export default Index;