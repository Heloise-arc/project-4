import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ConfettiPiece {
  id: number;
  x: number;
  delay: number;
  rotation: number;
  size: number;
}

export const Confetti: React.FC = () => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const newPieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
      rotation: Math.random() * 360,
      size: Math.random() * 8 + 4
    }));
    setPieces(newPieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{
            opacity: 1,
            x: `${piece.x}vw`,
            y: -20,
            rotate: piece.rotation
          }}
          animate={{
            opacity: 0,
            y: '100vh',
            rotate: piece.rotation + 360
          }}
          transition={{
            duration: 2.5,
            delay: piece.delay,
            ease: [0.23, 0.51, 0.32, 0.95]
          }}
          className="absolute top-0"
          style={{
            width: piece.size,
            height: piece.size,
            background: '#4E9F3D',
            borderRadius: '2px'
          }}
        />
      ))}
    </div>
  );
}; 