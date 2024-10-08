import React, { useRef, useEffect, useState } from "react";
import { Particle } from "./Particle";

interface CanvasProps {
  width?: number;
  height?: number;
}

const ParticleSystem: React.FC<CanvasProps> = ({
  width = window.innerWidth,
  height = document.documentElement.scrollHeight, // Adjust to full document height
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [canvasDimensions, setCanvasDimensions] = useState({ width, height });
  const animationIdRef = useRef<number | null>(null); // Store animation ID

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");

      const initParticles = () => {
        setParticles([]); // Clear particles
        const particlesArray: Particle[] = [];
        const numberOfParticles = (canvas.height * canvas.width) / 9000;

        for (let i = 0; i < numberOfParticles * 2; i++) {
          const size = Math.random() * 2 + 1;
          const x =
            Math.random() * (canvas.width - size * 2 - size * 2) + size * 2;
          const y =
            Math.random() * (canvas.height - size * 2 - size * 2) + size * 2;
          const directionX = Math.random() * 1 - 0.5;
          const directionY = Math.random() * 1 - 0.5;
          const color = "rgba(255, 255, 255, 0.5)";

          particlesArray.push(
            new Particle(x, y, size, directionX, directionY, color)
          );
        }

        setParticles(particlesArray);
      };

      const animate = () => {
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw(ctx);
        }
        connect();

        // Save animation ID and request next frame
        animationIdRef.current = requestAnimationFrame(animate);
      };

      const connect = () => {
        if (!ctx) return;

        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const particle1 = particles[i];
            const particle2 = particles[j];
            const distance =
              Math.pow(particle2.x - particle1.x, 2) +
              Math.pow(particle2.y - particle1.y, 2);
            if (distance < 4000) {
              const opacityValue = 0.8 - distance / 20000;
              ctx.lineWidth = 0.2;
              ctx.beginPath();
              ctx.moveTo(particle1.x, particle1.y);
              ctx.lineTo(particle2.x, particle2.y);
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue})`;
              ctx.stroke();
            }
          }
        }
      };

      const handleResize = () => {
        // Recalculate the height dynamically to include scrollable content
        const newWidth = window.innerWidth;
        const newHeight = document.documentElement.scrollHeight;

        setCanvasDimensions({
          width: newWidth,
          height: newHeight,
        });
        initParticles();
      };

      // Initialize particles and start animation
      initParticles();
      animate();

      window.addEventListener("resize", handleResize);

      return () => {
        // Clean up previous animation frame when the component unmounts or resizes
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
        }
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [particles.length, canvasDimensions]);

  return (
    <canvas
      id="canvas1"
      width={canvasDimensions.width}
      height={canvasDimensions.height}
      ref={canvasRef}
    />
  );
};

export { ParticleSystem };
