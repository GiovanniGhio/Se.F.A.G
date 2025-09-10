'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    setCurrentYear(new Date().getFullYear());
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (sectionId.startsWith('#')) {
      const element = document.querySelector(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-green-900 to-green-800">
      {/* Elementos decorativos naturales */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Silueta de montañas */}
        <div className="absolute top-0 left-0 w-full h-32 opacity-10">
          <svg viewBox="0 0 1200 120" className="w-full h-full">
            <path d="M0,80 L200,40 L400,80 L600,20 L800,60 L1000,20 L1200,60 L1200,120 L0,120 Z" fill="white"/>
          </svg>
        </div>
        
        {/* Elementos de follaje */}
        <div className="absolute bottom-10 left-5 text-5xl text-green-600 opacity-20">🌿</div>
        <div className="absolute bottom-20 right-8 text-4xl text-green-600 opacity-20">🌾</div>
        <div className="absolute top-1/3 left-1/4 text-3xl text-amber-600 opacity-20">🌻</div>
      </div>
      
      {/* Patrón de textura sutil */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMTUiLz48L2c+PC9zdmc+')] opacity-20"></div>

      {/* Contenido principal */}
      <div className="relative z-10 pt-16 pb-8">
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
          className="container mx-auto px-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Logo y descripción */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mr-3 backdrop-blur-sm border border-amber-400/30">
                  <span className="text-2xl text-amber-400">🌾</span>
                </div>
                <h3 className="text-2xl font-bold text-white font-serif">
                  SEFAG Campo
                </h3>
              </div>
              <p className="text-green-100 mb-6 leading-relaxed">
                Conectamos la tradición agrícola con innovación sustentable para cultivos más productivos y saludables.
              </p>
              <div className="flex space-x-3">
                {[
                  { icon: '📧', label: 'Email', url: 'mailto:info@sefagcampo.com' },
                  { icon: '📱', label: 'WhatsApp', url: 'https://wa.me/1234567890' },
                  { icon: '📘', label: 'Facebook', url: 'https://facebook.com/sefagcampo' },
                  { icon: '📸', label: 'Instagram', url: 'https://instagram.com/sefagcampo' }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-amber-500/10 hover:bg-amber-500/20 rounded-lg flex items-center justify-center transition-all duration-300 border border-amber-400/20 backdrop-blur-sm"
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="text-lg text-amber-300">{social.icon}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Enlaces rápidos */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-6 pb-2 border-b border-amber-500/40 inline-block text-white font-serif">
                Enlaces Rápidos
              </h4>
              <ul className="space-y-3">
                {[
                  { name: 'Inicio', path: '#inicio' },
                  { name: 'Servicios', path: '#servicios' },
                  { name: 'Proyectos', path: '#proyectos' },
                  { name: 'Nosotros', path: '#nosotros' },
                  { name: 'Contacto', path: '#contacto' }
                ].map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <button
                      onClick={() => scrollToSection(link.path)}
                      className="text-green-100 hover:text-amber-300 transition-all duration-300 flex items-center group"
                    >
                      <span className="w-2 h-2 bg-amber-400 rounded-full mr-3 group-hover:bg-amber-300 transition-colors"></span>
                      {link.name}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Servicios */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-6 pb-2 border-b border-amber-500/40 inline-block text-white font-serif">
                Nuestros Servicios
              </h4>
              <ul className="space-y-3">
                {[
                  'Agricultura de Precisión',
                  'Maquinaria Especializada',
                  'Asesoramiento Técnico',
                  'Sistemas de Riego',
                  'Manejo de Cultivos',
                  'Soluciones Sostenibles'
                ].map((service, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="text-green-100 hover:text-amber-300 transition-all duration-300 flex items-center"
                  >
                    <span className="text-amber-400 mr-2">✦</span>
                    {service}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contacto */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-6 pb-2 border-b border-amber-500/40 inline-block text-white font-serif">
                Contacto
              </h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center mr-3 mt-1 border border-amber-400/20">
                    <span className="text-sm text-amber-300">📧</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">Email</p>
                    <a href="mailto:info@sefagcampo.com" className="text-green-100 hover:text-amber-300 transition-colors">
                      info@sefagcampo.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center mr-3 mt-1 border border-amber-400/20">
                    <span className="text-sm text-amber-300">📞</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">Teléfono</p>
                    <a href="tel:+1234567890" className="text-green-100 hover:text-amber-300 transition-colors">
                      (123) 456-7890
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center mr-3 mt-1 border border-amber-400/20">
                    <span className="text-sm text-amber-300">📍</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">Ubicación</p>
                    <p className="text-green-100">Ruta Provincial 12, Km 128, Campo, Argentina</p>
                  </div>
                </div>

                {/* Botón de contacto */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6"
                >
                  <button
                    onClick={() => scrollToSection('#contacto')}
                    className="block w-full bg-amber-500 hover:bg-amber-600 text-green-900 text-center font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-amber-500/20 border border-amber-400/30"
                  >
                    Contactar Ahora
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Separador decorativo */}
        <div className="relative flex justify-center items-center my-8">
          <div className="h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent w-3/4"></div>
          <div className="absolute text-amber-400 text-2xl bg-green-900 px-4">🌻</div>
        </div>

        {/* Sección inferior */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="container mx-auto px-4"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Newsletter */}
            <div className="mb-6 md:mb-0">
              <h4 className="text-white font-medium mb-2 font-serif">Suscríbete a nuestro campo de noticias</h4>
              <div className="flex space-x-2">
                <input 
                  type="email" 
                  placeholder="Tu email" 
                  className="px-4 py-2 bg-green-800 border border-amber-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-white placeholder-green-300"
                />
                <button className="bg-amber-500 hover:bg-amber-600 text-green-900 font-semibold px-4 py-2 rounded-lg transition-colors">
                  Suscribir
                </button>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <div className="flex items-center justify-center md:justify-end space-x-2 mb-2">
                <span className="text-amber-400">🌱</span>
                <span className="text-white font-medium">SEFAG Campo</span>
              </div>
              <p className="text-green-200 text-sm">
                &copy; {currentYear} Cultivando futuro. Todos los derechos reservados.
              </p>
            </div>
          </div>

          {/* Línea divisoria y enlaces legales */}
          <div className="mt-8 pt-6 border-t border-amber-500/20">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex space-x-6">
                {['Política de Privacidad', 'Términos de Servicio', 'Cookies'].map((item, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05, color: "#f59e0b" }}
                    className="text-green-200 hover:text-amber-300 text-sm transition-colors"
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
              
              {/* Volver al inicio */}
              <motion.button
                onClick={scrollToTop}
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ y: 0, scale: 0.95 }}
                className="flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors"
              >
                <span className="text-sm font-semibold">Volver arriba</span>
                <div className="w-8 h-8 bg-amber-500/10 hover:bg-amber-500/20 rounded-full flex items-center justify-center transition-colors border border-amber-400/20">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;