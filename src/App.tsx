import { useEffect, useState, useCallback, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { Container, Engine, ISourceOptions, MoveDirection, OutMode } from "@tsparticles/engine"; // Importa los tipos adecuados
import { loadSlim } from "@tsparticles/slim";
import "./App.css";
import splashVideo from "./assets/SplashScreen.webm";
import splashVideoM from "./assets/SplashScreenM.webm";
import Sidebar from "./components/Sidebar";
import Home from "./sections/Home";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";

const SplashScreen: React.FC<{ onFinish: () => void; videoSrc: string }> = ({
    onFinish,
    videoSrc,
}) => {
    return (
        <div className="splash-screen">
            <video autoPlay muted onEnded={onFinish} className="splash-video">
                <source src={videoSrc} type="video/mp4" />
                Tu navegador no soporta videos.
            </video>
        </div>
    );
};

const App: React.FC = () => {
    const [isSplashVisible, setSplashVisible] = useState(true);
    const [videoSrc, setVideoSrc] = useState<string>(splashVideo);
    const [init, setInit] = useState(false);

    useEffect(() => {
        const isMobile = window.innerWidth <= 768;
        setVideoSrc(isMobile ? splashVideoM : splashVideo);
    }, []);

    const handleSplashFinish = () => {
        setSplashVisible(false);
    };

    // Inicialización de tsParticles (solo una vez)
    useEffect(() => {
        initParticlesEngine(async (engine: Engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    // Callback para cuando las partículas se hayan cargado
    const particlesLoaded = useCallback(async (container?: Container) => {
        console.log("Particles Loaded:", container);
    }, []);

    const options: ISourceOptions = useMemo(
        () => ({
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: MoveDirection.none,
              enable: true,
              outModes: {
                default: OutMode.out,
              },
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 2 },
            },
          },
          detectRetina: true,
        }),
        [],
      );    

      return (
        <div className="App">
            {isSplashVisible ? (
                <SplashScreen onFinish={handleSplashFinish} videoSrc={videoSrc} />
            ) : (
                <>
                    {init && (
                        <Particles
                            id="tsparticles"
                            options={options}
                            particlesLoaded={particlesLoaded}
                            style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                zIndex: -1, // Mantiene las partículas en el fondo
                            }}
                        />
                    )}
                    <div className="main-content" style={{ position: "relative", zIndex: 1 }}>
                        <Sidebar />
                        <div className="content">
                            <Home />
                            <Projects />
                            <Contact />
                        </div>
                    </div>
                </>
            )}
        </div>
    );    
};

export default App;