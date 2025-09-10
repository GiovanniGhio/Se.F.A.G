'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Imágenes del carrusel
const carouselImages = [
  {
    src: '/imagenes/maderaProy1.png',
    title: 'Agricultura de Precisión',
    description: 'Tecnología y experiencia para maximizar tu producción'
  },
  {
    src: '/imagenes/maderaProy2.jpg',
    title: 'Soluciones Integrales',
    description: 'Desde la siembra hasta la cosecha con los más altos estándares'
  },
  {
    src: '/imagenes/maderaProy1.png',
    title: 'Sostenibilidad',
    description: 'Practicas responsables con el medio ambiente'
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Efecto para el carrusel automático
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Carrusel personalizado */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="relative h-full w-full">
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={image.src}
                alt={image.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/40" />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4"
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-3xl">
                  {image.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 max-w-2xl">
                  {image.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg text-lg font-semibold transition-colors shadow-lg"
                >
                  Descubrir más
                </motion.button>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Controles del carrusel */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 p-3 rounded-full transition-colors"
          aria-label="Slide anterior"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 p-3 rounded-full transition-colors"
          aria-label="Siguiente slide"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Indicadores */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
              }`}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Flecha indicadora */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center"
        >
          <p className="text-sm mb-2">Desplaza para descubrir</p>
          <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* Sección de Introducción */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-green-800">
              Bienvenido a SEFAG Campo
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Líderes en soluciones agrícolas innovadoras, combinando tradición y tecnología 
              para maximizar el rendimiento de tus cultivos de manera sostenible.
            </p>
            <div className="w-20 h-1 bg-green-600 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              {
                icon: "🌱",
                title: "Experiencia",
                description: "Más de 20 años en el sector agrícola"
              },
              {
                icon: "🚜",
                title: "Tecnología",
                description: "Equipos y métodos de vanguardia"
              },
              {
                icon: "🌍",
                title: "Sostenibilidad",
                description: "Comprometidos con el medio ambiente"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-green-50 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-green-800">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de Servicios */}
      <section className="py-16 md:py-24 bg-green-800 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestros Servicios</h2>
            <p className="text-lg text-green-200 max-w-2xl mx-auto">
              Soluciones integrales para todas las etapas de tu producción agrícola
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Agricultura de Precisión",
                description: "Tecnología de punta para maximizar rendimientos",
                icon: "📊"
              },
              {
                title: "Maquinaria Especializada",
                description: "Equipos modernos para cada etapa del proceso",
                icon: "🚜"
              },
              {
                title: "Asesoramiento Técnico",
                description: "Expertos en agronomía para optimizar producción",
                icon: "👨‍🌾"
              },
              {
                title: "Sistemas de Riego",
                description: "Diseño e implementación de irrigación eficiente",
                icon: "💧"
              },
              {
                title: "Manejo de Cultivos",
                description: "Desde siembra hasta cosecha con estándares óptimos",
                icon: "🌾"
              },
              {
                title: "Soluciones Sostenibles",
                description: "Prácticas agrícolas responsables",
                icon: "🌍"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-green-700/50 p-6 rounded-lg border border-green-600/30 backdrop-blur-sm"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-green-100">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de Proyectos */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">Nuestros Proyectos</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Algunos de nuestros trabajos y proyectos realizados con éxito
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: item * 0.1 }}
                viewport={{ once: true }}
                className="relative group overflow-hidden rounded-lg shadow-md"
              >
                <div className="h-64 bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
                  <span className="text-white text-6xl">🌾</span>
                </div>
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <div className="text-center text-white">
                    <h3 className="text-xl font-bold mb-2">Proyecto Agrícola {item}</h3>
                    <p className="text-sm">Cultivo sostenible con tecnología de punta</p>
                    <button className="mt-4 px-4 py-2 bg-white text-green-800 rounded text-sm font-semibold">
                      Ver detalles
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     
    </div>
  );
}
  