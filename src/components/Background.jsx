"use client"
import { useEffect, useState, useRef } from 'react';

class BackgroundAnimation {
  constructor(canvas) {
    this.cnv = canvas;
    this.ctx = this.cnv.getContext(`2d`);

    this.circlesNum = 20;
    this.minRadius = 400;
    this.maxRadius = 400;
    this.speed = .005;

    (window.onresize = () => {
      this.setCanvasSize();
      this.createCircles();
    })();
    this.drawAnimation();
  }

  setCanvasSize() {
    this.w = this.cnv.width = innerWidth * devicePixelRatio;
    this.h = this.cnv.height = innerHeight * devicePixelRatio;
    this.ctx.scale(devicePixelRatio, devicePixelRatio)
  }

  createCircles() {
    this.circles = [];
    for (let i = 0; i < this.circlesNum; ++i) {
      this.circles.push(new Circle(this.w, this.h, this.minRadius, this.maxRadius));
    }
  }

  drawCircles() {
    this.circles.forEach(circle => circle.draw(this.ctx, this.speed));
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.w, this.h);
  }

  drawAnimation() {
    this.clearCanvas();
    this.drawCircles();
    window.requestAnimationFrame(() => this.drawAnimation());
  }
}

class Circle {
  constructor(w, h, minR, maxR) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.angle = Math.random() * Math.PI * 2;
    this.radius = Math.random() * (maxR - minR) + minR;
    this.firstColor = `hsla(223, 100%, 50%, 0.1)`;
    this.secondColor = `hsla(220, 100%, 0%, 0)`;
  }
  
  draw(ctx, speed) {
    this.angle += speed;
    const x = this.x + Math.cos(this.angle) * 200;
    const y = this.y + Math.sin(this.angle) * 200;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, this.radius);
    gradient.addColorStop(0.1, this.firstColor);
    gradient.addColorStop(1, this.secondColor);

    ctx.globalCompositeOperation = `overlay`;
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

const Background = () => {
  const canvasRef = useRef(null);
  const [active, setActive] = useState(false);
  const [resizing, setResizing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    let resizeTimeout;

    const handleResizeStart = () => {
      setActive(false);
    };

    const handleResizeEnd = () => {
      setActive(true);
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      handleResizeStart();
      setResizing(true);
      resizeTimeout = setTimeout(() => {
        handleResizeEnd();
        setResizing(false);
      }, 200);
    };

    window.addEventListener('resize', handleResize);

    setActive(true);
    new BackgroundAnimation(canvas);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      className={`absolute top-0 left-0 w-full h-full transition-opacity ${active ? 'opacity-100 duration-[10s]' : 'opacity-0 duration-[0s]'}`}
      ref={canvasRef}
    />
  );
};

export default Background;