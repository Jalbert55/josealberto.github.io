import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./Projects.css";

const projectData = [
  { title: "Agencia de Viajes - Traveler Tours", image: "https://www.travelertours.com.mx/assets/Logo-E6pU4Lji.svg", delay: 0.2, link: "https://www.travelertours.com.mx" },
  { title: "Simple Youtube MP3 Downloader", image: "https://i.postimg.cc/NFgRyJjv/YTmp3-Downloader.png", delay: 0.4, link: "https://github.com/Jalbert55/ytMP3Downloader" },
  { title: "Escena 3D Isometrica Mario Bros", image: "https://crehana-files.s3.amazonaws.com/images/files/2720efbd/72bca6db.gif", delay: 0.6, link: "https://www.crehana.com/proyecto/jmendozachavez55/14599/mario-bros-ac702a/?source_page=User%20Dashboard&source_detail=Project%20Card" },
  { title: "Pizza Truck - Animación 3D", image: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaDhocmpveTVrcmt5cGppdWc3dm15ZHVzY25rOWplMTQzOXlpbnR1MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MSST5JEI1GS5S9bdVX/giphy.gif", delay: 0.8, link: "https://www.crehana.com/proyecto/jmendozachavez55/16392/pizza-planeta/?source_page=User%20Dashboard&source_detail=Project%20Card" },
];

const Projects: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  return (
    <section id="projects" className="projects-container" ref={ref}>
      {/* Animación Wavy del Título */}
      <motion.h1 className="projects-title">
        {Array.from("Proyectos").map((letter, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
            style={{ display: "inline-block" }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.h1>

      {/* Contenedor de Tarjetas */}
      <div className="projects-grid">
        {projectData.map((project, index) => (
          <div className="project-card-wrapper" key={index}>
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
              <motion.div
                className="project-card"
                initial={{ opacity: 0, x: Math.random() * 600 - 300, y: Math.random() * 600 - 300 }}
                animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{ duration: 0.8, ease: "easeOut", delay: project.delay }}
                tabIndex={0} // Permite la navegación con teclado
              >
                {/* Contenedor de Imagen */}
                <div className="project-image-container">
                  <img src={project.image} alt={project.title} className="project-image" />
                </div>

                {/* Contenedor de Texto */}
                <div className="project-text">
                  <h2>{project.title}</h2>
                </div>
              </motion.div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;