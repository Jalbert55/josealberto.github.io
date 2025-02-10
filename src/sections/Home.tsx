import React from 'react';
import './Home.css';
import { GradualSpacing } from '../components/gradual-spacing';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import AnimatedContent from '../components/AnimatedContent';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
    return (
        <section id="home" className="home-container">
            <div className="text-container">
                <GradualSpacing text="¡Hola! Soy José Alberto" fontSize={7} />
                <motion.p
                    initial={{ opacity: 0, y: 20 }} // Estado inicial
                    animate={{ opacity: 1, y: 0 }} // Estado final
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    style={{ textAlign: 'justify'}} // Transición
                >Soy un apasionado desarrollador y creador digital con experiencia en programación, modelado y animación 3D, y edición de video. Me especializo en C#, Unity, Python y desarrollo web (React, HTML, CSS, Tailwind, etc.), creando aplicaciones y experiencias interactivas. Además, me encanta el diseño 3D y la animación, donde combino creatividad y técnica para dar vida a personajes, escenarios y efectos visuales. También cuento con experiencia en edición de video, transformando ideas en contenido visual atractivo y dinámico. 
                ¡Explora mi portafolio y descubre lo que puedo crear!</motion.p>
            </div>
            <div className="lottie-container">
                <AnimatedContent
                    distance={150}
                    direction="horizontal"
                    reverse={false}
                    config={{ tension: 80, friction: 20 }}
                    initialOpacity={0.2}
                    animateOpacity
                    scale={4}
                    threshold={0.2}
                >
                    <DotLottieReact
                        src="https://lottie.host/f876ac07-48a4-4e49-9bc7-fca638024fbc/IDv6lqKgEQ.lottie"
                        loop
                        autoplay
                    />
                </AnimatedContent>
            </div>
        </section>
    );
};

export default Home;