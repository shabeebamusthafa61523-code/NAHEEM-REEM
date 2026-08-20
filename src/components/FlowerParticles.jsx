import React, { useEffect, useRef } from 'react';

const FlowerParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Load flower image assets
    const flowerImg = new Image();
    flowerImg.src = '/user_gold_flower.png';

    const goldColors = ['#f3d775', '#fff0bd', '#e6ca65', '#d4af37', '#ffffff', '#900c3f', '#b81432'];

    // 75 small, sudden fast-falling opening particles
    const particleCount = 75;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: -Math.random() * height * 0.5 - 20, // Spawns above top viewport
        size: Math.random() * 8 + 5, // Small size (5px to 13px)!
        speedY: Math.random() * 6 + 4, // Sudden fast downward speed
        speedX: Math.random() * 1.2 - 0.6,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.05 + 0.02,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 4.0,
        opacity: 1,
        type: Math.random() > 0.3 ? 'image' : (Math.random() > 0.5 ? 'star' : 'petal'),
        color: goldColors[Math.floor(Math.random() * goldColors.length)]
      });
    }

    const drawStar = (ctx, size) => {
      const r = size / 2;
      ctx.beginPath();
      ctx.moveTo(0, -r);
      ctx.quadraticCurveTo(0, 0, r, 0);
      ctx.quadraticCurveTo(0, 0, 0, r);
      ctx.quadraticCurveTo(0, 0, -r, 0);
      ctx.quadraticCurveTo(0, 0, 0, -r);
      ctx.fill();
    };

    const drawPetal = (ctx, size) => {
      const r = size / 2;
      ctx.beginPath();
      ctx.moveTo(0, -r);
      ctx.bezierCurveTo(r, -r, r, r, 0, r);
      ctx.bezierCurveTo(-r, r, -r, -r, 0, -r);
      ctx.fill();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      let activeCount = 0;

      particles.forEach((p) => {
        p.swayPhase += p.swaySpeed;
        p.y += p.speedY; // Sudden fast fall
        p.x += Math.sin(p.swayPhase) * 1.2 + p.speedX;
        p.rotation += p.rotationSpeed;

        // Rapid fade out as it falls
        if (p.y > height * 0.3) {
          p.opacity -= 0.022;
        }

        if (p.opacity > 0 && p.y < height + 60) {
          activeCount++;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = Math.max(p.opacity, 0);

          if (p.type === 'image' && flowerImg.complete && flowerImg.naturalWidth > 0) {
            ctx.filter = 'drop-shadow(0 0 4px rgba(243, 215, 117, 0.6))';
            ctx.drawImage(flowerImg, -p.size / 2, -p.size / 2, p.size, p.size);
            ctx.filter = 'none';
          } else if (p.type === 'star') {
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 6;
            ctx.shadowColor = p.color;
            drawStar(ctx, p.size);
          } else {
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 5;
            ctx.shadowColor = p.color;
            drawPetal(ctx, p.size);
          }

          ctx.restore();
        }
      });

      if (activeCount > 0) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-10"
      style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 1 }}
    />
  );
};

export default FlowerParticles;
