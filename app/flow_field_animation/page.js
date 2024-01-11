'use client'
import { useRef, useEffect } from 'react';

const FlowFieldAnimation = () => {
  const canvasRef = useRef(null);
  const ctx = useRef(null);
  const numParticles = 4000;
  const particles = useRef([]);
  const gridSize = 50;
  const flowField = useRef([]);
  const columns = useRef(0);
  const rows = useRef(0);
  const angleChangeRate = 0.2;
  const maxParticleSpeed = .3;
  const trailOpacity = 1;
  const particleRadius = .3;
  const respawnThreshold = 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    ctx.current = canvas.getContext('2d');
    let animationFrameId;

    const updateCanvasDimensions = () => {
      canvas.width = window.innerWidth + gridSize
      canvas.height = window.innerHeight + gridSize
      columns.current = Math.floor(canvas.width / gridSize)
      rows.current = Math.floor(canvas.height / gridSize);
    };

    window.addEventListener('resize', updateCanvasDimensions);
    updateCanvasDimensions();

    columns.current = Math.floor(canvas.width / gridSize);
    rows.current = Math.floor(canvas.height / gridSize);

    for (let y = 0; y < rows.current; y++) {
      for (let x = 0; x < columns.current; x++) {
        // Increase randomness in the initialization of flow field vectors
        const angle = Math.random() * Math.PI * 2 + Math.random() * 0.2 - 0.1;
        flowField.current.push({ x, y, angle });
      }
    }

    const initializeParticles = () => {
      for (let i = 0; i < numParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const velocity = { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 };
        particles.current.push({ x, y, velocity });
      }
    };

    initializeParticles();

    const animate = () => {
      ctx.current.fillStyle = 'rgba(0, 0, 0, .01)';
      ctx.current.fillRect(0, 0, canvas.width, canvas.height);

      // Draw lines to visualize flow field vectors
      // ctx.current.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      // ctx.current.lineWidth = 1;


      // flowField.current.forEach((vector) => {
      //   const start_x = vector.x * gridSize + gridSize / 2;
      //   const start_y = vector.y * gridSize + gridSize / 2;
      //   const end_x = start_x + Math.cos(vector.angle) * gridSize / 2;
      //   const end_y = start_y + Math.sin(vector.angle) * gridSize / 2;

      //   ctx.current.beginPath();
      //   ctx.current.moveTo(start_x, start_y);
      //   ctx.current.lineTo(end_x, end_y);
      //   ctx.current.stroke();
      // });


      particles.current.forEach((particle) => {
        const gridX = Math.floor(Math.min(particle.x, canvas.width - 1) / gridSize);
        const gridY = Math.floor(Math.min(particle.y, canvas.height - 1) / gridSize);

        if (gridX >= 0 && gridX < columns.current && gridY >= 0 && gridY < rows.current) {
          const flowVector = flowField.current[gridY * columns.current + gridX];

          const acceleration = {
            x: Math.cos(flowVector.angle) * 0.005,
            y: Math.sin(flowVector.angle) * 0.005,
          };

          particle.velocity.x += acceleration.x
          particle.velocity.y += acceleration.y

          const speed = Math.sqrt(
            particle.velocity.x ** 2 + particle.velocity.y ** 2
          );
          if (speed > maxParticleSpeed) {
            const scale = maxParticleSpeed / speed;
            particle.velocity.x *= scale;
            particle.velocity.y *= scale;
          }

          particle.x += particle.velocity.x;
          particle.y += particle.velocity.y;

          if (particle.x < -respawnThreshold || particle.x > canvas.width + respawnThreshold ||
            particle.y < -respawnThreshold || particle.y > canvas.height + respawnThreshold) {
            particle.x = Math.random() * canvas.width;
            particle.y = Math.random() * canvas.height;
          }

          ctx.current.fillStyle = `rgba(8, 162, 120, ${trailOpacity})`;
          ctx.current.beginPath();
          ctx.current.arc(particle.x, particle.y, particleRadius, 0, Math.PI * 2);
          ctx.current.fill();
        }
      });

      flowField.current.forEach((vector) => {
        vector.angle += (Math.random() - 0.5) * angleChangeRate;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', updateCanvasDimensions);
    };
  }, []);

  return (
    <div style={{
      overflow: 'hidden',
      height: '100vh',
    }}>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
      ></canvas>
    </div>
  );
};

export default FlowFieldAnimation;
