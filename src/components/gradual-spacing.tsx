'use client';

import { AnimatePresence, motion, useInView } from 'framer-motion';
import * as React from 'react';

interface GradualSpacingProps {
  text?: string;
  fontSize?: number; // Ahora recibe un número
}

// Diccionario para mapear números a clases de Tailwind
const fontSizeMap: Record<number, string> = {
  0: 'text-xs',
  1: 'text-sm',
  2: 'text-base',
  3: 'text-lg',
  4: 'text-xl',
  5: 'text-2xl',
  6: 'text-3xl',
  7: 'text-4xl',
  8: 'text-5xl',
  9: 'text-6xl',
  10: 'text-7xl',
  11: 'text-8xl',
  12: 'text-9xl',
};

export function GradualSpacing({ text = 'Gradual Spacing', fontSize = 4 }: GradualSpacingProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  const selectedFontSize = fontSizeMap[fontSize] || fontSizeMap[4];

  return (
    <div className="flex flex-wrap space-x-1 justify-center break-normal text-center">
      <AnimatePresence>
        {text.split('').map((char, i) => (
          <motion.p
            ref={ref}
            key={i}
            initial={{ opacity: 0, x: -18 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            exit="hidden"
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className={`${selectedFontSize} text-center font-bold tracking-tight sm:tracking-normal md:leading-[3rem] sm:leading-[2rem]`}
          >
            {char === ' ' ? <span>&nbsp;</span> : char}
          </motion.p>
        ))}
      </AnimatePresence>
    </div>
  );
}