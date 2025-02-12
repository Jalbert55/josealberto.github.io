import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import "./Contact.css";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify"; // Importa react-toastify
import "react-toastify/dist/ReactToastify.css";

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const ref = useRef(null);
  const titleRef = useRef(null); // Referencia para el título
  const formRef = useRef(null); // Referencia para el formulario
  const infoRef = useRef(null); // Referencia para la información de contacto

  const isTitleInView = useInView(titleRef, { once: true, margin: "-100px 0px" });
  const isFormInView = useInView(formRef, { once: true, margin: "-100px 0px" });
  const isInfoInView = useInView(infoRef, { once: true, margin: "-100px 0px" });
  
  const [formData, setFormData] = useState({
    // Estado para los datos del formulario
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const fieldLabels: { [key: string]: string } = {
    name: "Nombre",
    email: "Email",
    phone: "Teléfono",
    message: "Mensaje",
  };  

  // Expande el formulario después de un breve retraso
  useEffect(() => {
    const timer = setTimeout(() => setIsExpanded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // Actualiza el estado del formulario al cambiar los campos
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    // Tipo de evento correcto
    e.preventDefault();
    if (!form.current) return;

    if (form.current) {
      try {
        const result = await emailjs.sendForm(
          "service_qc0nfsx",
          "template_ql5uzon",
          form.current,
          "3oOOhCaiC9V-9nsUI"
        );

        console.log("SUCCESS!", result.text);
        toast.success("¡Gracias por tu mensaje! Te contactare pronto.", {
          // Muestra la notificación
          position: "top-center",
          autoClose: 3000, // Se oculta automáticamente después de 3 segundos
        });
      } catch (error) {
        console.error("FAILED...", error);
        toast.error(
          "Error al enviar el mensaje. Por favor, inténtalo de nuevo.",
          {
            position: "top-center",
          }
        );
      }
    }
  };

  return (
    <section id="contact" className="contact-container" ref={ref}>
      <ToastContainer />
      {/* Título con animación diferente */}
      <motion.h1
        className="contact-title"
        initial={{ opacity: 0, y: -50 }}
        ref={titleRef}
        animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
          type: "spring",
          stiffness: 100,
        }}
      >
        Contáctame
      </motion.h1>

      {/* Contenedor con dos columnas */}
      <div className="contact-content">
        {/* Formulario de contacto */}
        <div className="form-container">
          <motion.form ref={formRef} onSubmit={sendEmail} initial={{ opacity: 0, x: -100 }} animate={isFormInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} className="space-y-4">          
            <AnimatePresence>
              {isExpanded && (
                <>
                  {["name", "email", "phone", "message"].map((field, index) => (
                    <motion.div
                      key={field}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.3, duration: 0.5 }}
                      className="flex flex-col"
                    >
                      <label htmlFor={field} className="text-gray-700 font-medium capitalize">
                        {fieldLabels[field]}
                      </label>

                      {field === "message" ? (
                        <motion.textarea
                          id={field}
                          name={field}
                          value={formData[field as keyof typeof formData]}
                          onChange={handleChange}
                          required
                          rows={4}
                          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 resize-none"
                          initial={{ scale: 0 }}
                          animate={{ scale: [0, 1.1, 1] }}
                          transition={{ delay: 0.4 + index * 0.3, duration: 0.5, type: "spring" }}
                        />
                      ) : (
                        <motion.input
                          type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                          id={field}
                          name={field}
                          value={formData[field as keyof typeof formData]}
                          onChange={handleChange}
                          required={field !== "phone"}
                          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
                          initial={{ scale: 0 }}
                          animate={{ scale: [0, 1.1, 1] }}
                          transition={{ delay: 0.4 + index * 0.3, duration: 0.5, type: "spring" }}
                        />
                      )}
                    </motion.div>
                  ))}
                </>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              className="w-full p-3 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!formData.name || !formData.email || !formData.message}
            >
              Enviar
            </motion.button>
          </motion.form>
        </div>

        {/* Información de Contacto */}
        <motion.div
          className="contact-info"
          ref={infoRef}
          initial={{ opacity: 0, x: 100 }}
          animate={isInfoInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          <h2>Información de Contacto</h2>
          <ul className="contact-buttons-list">
            <a
              href="mailto:jmendozachavez55@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                className="contact-button email-button" // Clases para estilos
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#e0e0e0"
                    d="M5.5,40.5h37c1.933,0,3.5-1.567,3.5-3.5V11c0-1.933-1.567-3.5-3.5-3.5h-37C3.567,7.5,2,9.067,2,11v26C2,38.933,3.567,40.5,5.5,40.5z"
                  ></path>
                  <path
                    fill="#d9d9d9"
                    d="M26,40.5h16.5c1.933,0,3.5-1.567,3.5-3.5V11c0-1.933-1.567-3.5-3.5-3.5h-37C3.567,7.5,2,9.067,2,11L26,40.5z"
                  ></path>
                  <path
                    fill="#eee"
                    d="M6.745,40.5H42.5c1.933,0,3.5-1.567,3.5-3.5V11.5L6.745,40.5z"
                  ></path>
                  <path
                    fill="#e0e0e0"
                    d="M25.745,40.5H42.5c1.933,0,3.5-1.567,3.5-3.5V11.5L18.771,31.616L25.745,40.5z"
                  ></path>
                  <path
                    fill="#ca3737"
                    d="M42.5,9.5h-37C3.567,9.5,2,9.067,2,11v26c0,1.933,1.567,3.5,3.5,3.5H7V12h34v28.5h1.5c1.933,0,3.5-1.567,3.5-3.5V11C46,9.067,44.433,9.5,42.5,9.5z"
                  ></path>
                  <path
                    fill="#f5f5f5"
                    d="M42.5,7.5H24H5.5C3.567,7.5,2,9.036,2,11c0,1.206,1.518,2.258,1.518,2.258L24,27.756l20.482-14.497c0,0,1.518-1.053,1.518-2.258C46,9.036,44.433,7.5,42.5,7.5z"
                  ></path>
                  <path
                    fill="#e84f4b"
                    d="M43.246,7.582L24,21L4.754,7.582C3.18,7.919,2,9.297,2,11c0,1.206,1.518,2.258,1.518,2.258L24,27.756l20.482-14.497c0,0,1.518-1.053,1.518-2.258C46,9.297,44.82,7.919,43.246,7.582z"
                  ></path>
                </svg>{" "}
                jmendozachavez55@gmail.com
              </motion.button>
            </a>
            <a
              href="tel:+525586732540"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                className="contact-button phone-button" // Clases para estilos
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  shape-rendering="geometricPrecision"
                  text-rendering="geometricPrecision"
                  image-rendering="optimizeQuality"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  viewBox="0 0 286 512.03"
                >
                  <path
                    fill="#43567C"
                    fill-rule="nonzero"
                    d="M55.833 0h174.334C260.882 0 286 25.117 286 55.833v400.364c0 30.707-25.126 55.833-55.833 55.833H55.833C25.117 512.03 0 486.913 0 456.197V55.833C0 25.159 25.159 0 55.833 0z"
                  />
                  <path
                    fill="#8CC0F3"
                    d="M276.681 70.044v371.209H9.318V70.044z"
                  />
                  <path
                    fill="#BED7F0"
                    fill-rule="nonzero"
                    d="M33.083 112.744c-5.543 5.542-13.972-2.887-8.43-8.429l18.661-18.661c5.543-5.543 13.972 2.887 8.43 8.429l-18.661 18.661zm4.432 34.078c-5.542 5.542-13.971-2.887-8.429-8.43l48.309-48.308c5.542-5.543 13.971 2.886 8.429 8.429l-48.309 48.309z"
                  />
                </svg>
                +52 5586732540
              </motion.button>
            </a>
            <a
              href="https://wa.me/+525586732540"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                className="contact-button whatsapp-button" // Clases para estilos
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="30"
                  height="30"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#fff"
                    d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"
                  ></path>
                  <path
                    fill="#cfd8dc"
                    d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"
                  ></path>
                  <path
                    fill="#40c351"
                    d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"
                  ></path>
                  <path
                    fill="#fff"
                    fill-rule="evenodd"
                    d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z"
                    clip-rule="evenodd"
                  ></path>
                </svg>{" "}
                Whatsapp
              </motion.button>
            </a>
            <a
              href="https://www.behance.net/jose-alberto"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                className="contact-button behance-button" // Clases para estilos
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="30"
                  height="30"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#2196F3"
                    d="M6,10c0-2.209,1.791-4,4-4h28c2.209,0,4,1.791,4,4v28c0,2.209-1.791,4-4,4H10c-2.209,0-4-1.791-4-4V10z"
                  ></path>
                  <path
                    fill="#FFF"
                    d="M27 17H34V19H27zM21.512 23.428c.585-.285 1.903-.934 1.903-2.857 0-3.617-3.952-3.57-4.683-3.57H12v14h7.025C19.61 31 24 30.835 24 26.999 24 24.524 22.39 23.714 21.512 23.428zM15 19.428h2.928c.292 0 2.195.104 2.195 1.572 0 1.467-1.463 1.714-1.902 1.714H15V19.428zM18.336 28.571h-3.367v-3.856h3.367c.731 0 2.341.237 2.341 2C20.677 28.476 18.628 28.571 18.336 28.571zM32.438 28.395c-.465.289-.929.436-1.549.436-2.326 0-2.789-1.961-2.789-2.83H36c0-.869 0-1.511-.155-2.236C35.689 23.04 34.63 20 30.734 20 25.289 20 25 24.778 25 25.5c0 .723.156 1.593.467 2.171.309.724.619 1.304 1.084 1.736.464.435 1.083.866 1.703 1.157C29.028 30.855 29.803 31 30.578 31c1.238 0 2.324-.288 3.253-.868.931-.579 1.55-1.448 2.014-2.606h-2.633C33.057 27.816 32.902 28.104 32.438 28.395zM30.734 22.027c1.518 0 2.168 1.592 2.322 2.314H28.1C28.1 24.198 28.471 22.027 30.734 22.027z"
                  ></path>
                </svg>{" "}
                Behance
              </motion.button>
            </a>
            <a
              href="https://www.linkedin.com/in/jose-alberto-mendoza/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                className="contact-button linkedin-button" // Clases para estilos
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="30"
                  height="30"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#0288D1"
                    d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                  ></path>
                  <path
                    fill="#FFF"
                    d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
                  ></path>
                </svg>{" "}
                LinkedIn
              </motion.button>
            </a>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
