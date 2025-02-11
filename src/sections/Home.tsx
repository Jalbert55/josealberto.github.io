import React from 'react';
import './Home.css';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import AnimatedContent from '../components/AnimatedContent';
import { motion } from 'framer-motion';

const sentence = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08, // Retraso entre letras
        },
    },
};

const letter = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};

const Home: React.FC = () => {
    return (
        <section id="home" className="home-container">
            <div className="text-container flex flex-col items-center justify-center">
                <motion.h1
                    variants={sentence}
                    initial="hidden"
                    animate="visible"
                    className="text-4xl sm:text-5xl md:text-6xl font-bold text-center"
                >
                    {"¡Hola! Soy José Alberto".split("").map((char, index) => (
                        <motion.span key={index} variants={letter}>
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                </motion.h1>
                <br/>
                <motion.p
                    initial={{ opacity: 0, y: 20 }} // Estado inicial
                    animate={{ opacity: 1, y: 0 }} // Estado final
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="text-xl text-justify"
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
                    scale={1.1}
                    threshold={0.2}
                >
                    <DotLottieReact
                        src="https://lottie.host/f876ac07-48a4-4e49-9bc7-fca638024fbc/IDv6lqKgEQ.lottie"
                        loop
                        autoplay
                        height={400}
                        width={400}
                        className="w-full h-auto max-w-[500px] max-h-[400px]"
                    />
                </AnimatedContent>
            </div>
        </section>
    );
};

export default Home;