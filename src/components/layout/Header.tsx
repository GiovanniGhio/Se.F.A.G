'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Para landing page, los enlaces suelen ser anclas internas
  const navItems = [
    { name: 'Inicio', path: '#inicio' },
    { name: 'Servicios', path: '#servicios' },
    { name: 'Proyectos', path: '#proyectos' },
    { name: 'Nosotros', path: '#nosotros' },
    { name: 'Contacto', path: '#contacto' },
  ];

  const scrollToSection = (sectionId: string) => {
    if (sectionId.startsWith('#')) {
      const element = document.querySelector(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: 'spring' }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg py-2 border-b' 
            : 'bg-transparent py-4'
        }`}
      >
        <nav className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              <Link href="/" className="flex items-center space-x-3">
                <div className="relative w-12 h-12">
                  <Image
                    src="/imagenes/ImagenHeader.png"
                    alt="SEFAG Campo Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <span className={`text-xl font-bold ${
                  isScrolled ? 'text-green-800' : 'text-white'
                }`}>
                  Se.F.A.G
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="relative"
                >
                  <button
                    onClick={() => scrollToSection(item.path)}
                    className={`relative px-4 py-2 font-medium transition-colors duration-300 ${
                      isScrolled 
                        ? 'text-gray-700 hover:text-green-700' 
                        : 'text-white hover:text-green-200'
                    }`}
                  >
                    {item.name}
                  </button>
                </motion.div>
              ))}
              
              {/* Botón CTA */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => scrollToSection('#contacto')}
                  className="ml-4 px-6 py-2 bg-green-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-green-700"
                >
                  Contactar
                </button>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="md:hidden p-2 rounded-lg focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 relative">
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  className={`block absolute h-0.5 w-6 transition-all duration-300 ${
                    isScrolled ? 'bg-green-800' : 'bg-white'
                  }`}
                />
                <motion.span
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className={`block absolute h-0.5 w-6 mt-2 transition-all duration-300 ${
                    isScrolled ? 'bg-green-800' : 'bg-white'
                  }`}
                />
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  className={`block absolute h-0.5 w-6 mt-4 transition-all duration-300 ${
                    isScrolled ? 'bg-green-800' : 'bg-white'
                  }`}
                />
              </div>
            </motion.button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white/95 backdrop-blur-md overflow-hidden border-b"
            >
              <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col space-y-4">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <button
                        onClick={() => scrollToSection(item.path)}
                        className="block w-full text-left py-3 px-4 text-gray-700 font-medium rounded-lg hover:bg-green-50 transition-colors duration-300"
                      >
                        {item.name}
                      </button>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
                    className="pt-4"
                  >
                    <button
                      onClick={() => scrollToSection('#contacto')}
                      className="block w-full text-center py-3 px-6 bg-green-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:bg-green-700"
                    >
                      Contactar Ahora
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

    </>
  );
};

export default Header;