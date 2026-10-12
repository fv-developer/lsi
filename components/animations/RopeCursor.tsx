'use client';

import React, { useEffect, useRef } from 'react';

export interface RopeCursorProps {
  ropeColor?: string;
  ropeWidth?: number;
  ropeOpacity?: number;
  segmentLength?: number;
  segmentCount?: number;
}

export const RopeCursor: React.FC<RopeCursorProps> = ({
  ropeColor = '#4e4d4b',
  ropeWidth = 2,
  ropeOpacity = 0.6,
  segmentLength = 0,
  segmentCount = 8,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = false;

    // Set canvas dimensions to window size with High-DPI (Retina) scaling
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize rope points
    const count = Math.max(2, segmentCount);
    const segLen = segmentLength > 0 ? segmentLength : 12;

    const mouse = { x: -100, y: -100, targetX: -100, targetY: -100 };
    const points: { x: number; y: number }[] = [];

    for (let i = 0; i <= count; i++) {
      points.push({ x: -100, y: -100 });
    }

    const handlePointerMove = (e: PointerEvent | MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        points.forEach((p) => {
          p.x = e.clientX;
          p.y = e.clientY;
        });
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, window.innerWidth * dpr, window.innerHeight * dpr);

      if (isVisible) {
        // Smooth mouse target follow
        mouse.x += (mouse.targetX - mouse.x) * 0.45;
        mouse.y += (mouse.targetY - mouse.y) * 0.45;

        // Point 0 follows cursor
        points[0].x = mouse.x;
        points[0].y = mouse.y;

        // Verlet / Inverse kinematics for rope segments
        for (let i = 1; i <= count; i++) {
          const p = points[i];
          const prev = points[i - 1];

          const dx = p.x - prev.x;
          const dy = p.y - prev.y;
          const dist = Math.hypot(dx, dy) || 0.001;

          if (dist > segLen) {
            const factor = segLen / dist;
            p.x = prev.x + dx * factor;
            p.y = prev.y + dy * factor;
          }

          // Smooth lag interpolation
          p.x += (prev.x - p.x) * 0.35;
          p.y += (prev.y - p.y) * 0.35;
        }

        // Draw smooth rope line curve
        if (points.length > 1) {
          ctx.save();
          ctx.globalAlpha = ropeOpacity;
          ctx.strokeStyle = ropeColor;
          ctx.lineWidth = ropeWidth;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';

          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);

          for (let i = 1; i < points.length - 1; i++) {
            const xc = (points[i].x + points[i + 1].x) / 2;
            const yc = (points[i].y + points[i + 1].y) / 2;
            ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
          }

          if (points.length > 2) {
            const last = points[points.length - 1];
            ctx.lineTo(last.x, last.y);
          }

          ctx.stroke();
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [ropeColor, ropeWidth, ropeOpacity, segmentLength, segmentCount]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999] h-full w-full"
    />
  );
};

export default RopeCursor;
