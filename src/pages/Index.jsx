import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Instagram, MapPin, Clock, Phone } from 'lucide-react';
import { Button } from "@/components/ui/button";
import StarryBackground from '../components/StarryBackground';
import FloatingLogo from '../components/FloatingLogo';

const Index = () => {
  const [selectedStore, setSelectedStore] = useState(null);

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

  const handleStoreSelect = (store) => {
    setSelectedStore(store);
  };

  const handleCopyToClipboard = () => {
    const text = `
Kambo Grow\n
77.239.704-6\n
              Cuenta Corriente\n
              87315568\n
              Banco Santander\n
              contacto@kambogrow.com`;
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Datos copiados al portapapeles');
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-8 bg-black text-white">
      <StarryBackground />
      <FloatingLogo />
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes neonGlow {
          0%, 100% { filter: drop-shadow(0 0 1px #7fff00) drop-shadow(0 0 2px #7fff00); }
          50% { filter: drop-shadow(0 0 2px #7fff00) drop-shadow(0 0 3px #7fff00); }
        }
        .neon-logo {
          animation: neonGlow 2s ease-in-out infinite;
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
        @media (min-width: 640px) {
          .store-button, .social-button {
            font-size: 1rem;
            padding: 12px 25px;
          }
        }
      `}</style>

      {!selectedStore ? (
        <div className="text-center relative z-10 w-full max-w-md" style={{ animation: 'fadeIn 1.5s forwards' }}>
          <div className="relative mb-2">
            <img src="https://imgur.com/JX2R9en.png" alt="Kambo Logo" className="w-48 h-auto mx-auto neon-logo" style={{ filter: 'drop-shadow(0 0 3px rgba(127, 255, 0, 0.7))' }} />
          </div>
          <h1 className="text-2xl sm:text-4xl mb-6 sm:mb-8 font-bold text-shadow relative z-10">Kambo Grow & Smart Shop 🐸</h1>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button className="store-button w-full sm:w-48 bg-[#4CAF50] text-[#000000] hover:bg-[#45a049]" onClick={() => handleStoreSelect('main')}>
              Explorar Tienda
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center w-full max-w-md p-4 relative z-10" style={{ animation: 'fadeIn 1.5s forwards' }}>
          <div className="relative mb-2">
            <img src="https://imgur.com/JX2R9en.png" alt="Kambo Logo" className="w-20 h-auto mx-auto neon-logo" style={{ filter: 'drop-shadow(0 0 3px rgba(127, 255, 0, 0.7))' }} />
          </div>
          <h2 className="text-xl sm:text-3xl mb-4 sm:mb-6 font-bold relative z-10">Kambo Grow & Smart Shop 🐸</h2>
          <div className="mb-6 text-left">
            <h3 className="text-lg sm:text-xl mb-3 sm:mb-4 font-semibold">Información de Transferencia</h3>
            <p className="text-xs sm:text-base whitespace-pre-line">
              Rut: 77.239.704-6<br />
              Banco: Banco Santander<br />
              Tipo de cuenta: Cuenta corriente<br />
              Numero de cuenta: 87315568<br />
              Email: contacto@kambogrow.com
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
