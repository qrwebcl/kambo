import React from 'react';
import { Instagram, MapPin, Clock, Phone } from 'lucide-react';
import { Button } from "@/components/ui/button"

const Index = () => {
  return (
    <div className="min-h-screen bg-[#232323] text-white font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-[#232323] shadow-md z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <img src="https://ozeta.cl/wp-content/sabai/File/files/l_556ef36bb393009069eb500ba3087112.png" alt="Kambo Grow & Smart Shop" className="h-12" />
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#home" className="hover:text-[#ffca28] transition-colors">Inicio</a></li>
              <li><a href="#services" className="hover:text-[#ffca28] transition-colors">Servicios</a></li>
              <li><a href="#contact" className="hover:text-[#ffca28] transition-colors">Contacto</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-12 px-4 bg-gradient-to-b from-[#232323] to-[#2c2c2c]">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Kambo Grow & Smart Shop 🐸</h1>
          <p className="text-xl mb-8">Tu tienda especializada en cultivo y productos inteligentes</p>
          <Button className="bg-[#ffca28] text-[#232323] hover:bg-[#ffd54f] transition-colors">
            Explora nuestros productos
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 px-4 bg-[#2c2c2c]">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Nuestros Servicios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#333333] p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Productos para Cultivo</h3>
              <p>Ofrecemos una amplia gama de productos para el cultivo, desde semillas hasta equipos especializados.</p>
            </div>
            <div className="bg-[#333333] p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Smart Shop</h3>
              <p>Descubre nuestra selección de productos inteligentes y accesorios innovadores para tu estilo de vida.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 px-4 bg-[#232323]">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Contáctanos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <MapPin className="mr-2 text-[#ffca28]" />
                <p>123 Calle Principal, Ciudad, País</p>
              </div>
              <div className="flex items-center mb-4">
                <Clock className="mr-2 text-[#ffca28]" />
                <p>Lun - Sáb: 10:00 - 20:00</p>
              </div>
              <div className="flex items-center mb-4">
                <Phone className="mr-2 text-[#ffca28]" />
                <p>+1 234 567 890</p>
              </div>
              <Button 
                className="bg-[#25D366] text-white hover:bg-[#128C7E] transition-colors mt-4"
                onClick={() => window.open('https://wa.link/ud24fn', '_blank')}
              >
                Contáctanos por WhatsApp
              </Button>
            </div>
            <div className="bg-[#333333] p-6 rounded-lg shadow-lg">
              {/* Aquí puedes agregar un formulario de contacto si lo deseas */}
              <p className="text-center">¡Visítanos en nuestra tienda!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1c1c1c] py-8 px-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2024 Kambo Grow & Smart Shop. Todos los derechos reservados.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#ffca28] hover:text-white transition-colors">
              <Instagram />
            </a>
            {/* Agrega más iconos de redes sociales aquí si es necesario */}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;