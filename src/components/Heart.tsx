interface Particle {
  id: number;
  x: number;
  y: number;
  animationDuration: number;
  animationDelay: number;
}

// Generate particles once at module level to avoid React Compiler errors
const generateParticles = (): Particle[] => {
  const particleArray: Particle[] = [];
  const particleCount = 130;
  
  for (let i = 0; i < particleCount; i++) {
    const t = (i / particleCount) * 2 * Math.PI;
    // Mathematical heart curve
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    
    particleArray.push({
      id: i,
      x,
      y,
      animationDuration: 1.2 + Math.random() * 0.4,
      animationDelay: Math.random() * 0.3,
    });
  }
  
  return particleArray;
};

const particles = generateParticles();

export default function Heart() {
  return (
    <div className="absolute inset-0 flex items-start justify-center pointer-events-none" style={{ paddingTop: '15%' }}>
      {/* Wrapper for subtle floating movement */}
      <div 
        style={{
          animation: 'heartFloat 8s ease-in-out infinite',
          transformOrigin: 'center center',
        }}
      >
        {/* Outer glow layer */}
        <div 
          className="absolute heart-glow"
          style={{
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 23, 68, 0.2) 0%, transparent 70%)',
            filter: 'blur(40px)',
            transform: 'translate(-50%, -50%)',
            left: '50%',
            top: '50%',
            animation: 'heartGlowPulse 3s ease-in-out infinite',
          }}
        />
        
        {/* Heart container with beat animation */}
        <div 
          className="relative heart-container"
          style={{
            filter: 'drop-shadow(0 0 40px rgba(255, 23, 68, 0.8)) drop-shadow(0 0 80px rgba(255, 107, 157, 0.4))',
            willChange: 'transform, filter',
            animation: 'heartbeat 1.2s ease-in-out infinite',
            transformOrigin: 'center center',
          }}
        >
        <div className="relative w-full h-full heart-particles">
          {particles.map((particle, index) => {
            return (
              <div
                key={particle.id}
                className="absolute rounded-full heart-particle"
                style={{
                  left: `calc(50% + ${particle.x * 8}px)`,
                  top: `calc(50% + ${particle.y * 8}px)`,
                  width: '4px',
                  height: '4px',
                  transform: 'translate(-50%, -50%)',
                  animation: `particleGlow ${particle.animationDuration}s ease-in-out infinite, particleColorShift ${4 + index % 3}s ease-in-out infinite`,
                  animationDelay: `${particle.animationDelay}s`,
                  willChange: 'opacity, transform, background-color, box-shadow',
                }}
              />
            );
          })}
        </div>
        <style>{`
          .heart-glow {
            width: 500px;
            height: 450px;
          }
          .heart-container {
            width: 400px;
            height: 360px;
          }
          @media (max-width: 640px) {
            .heart-glow {
              width: 400px;
              height: 360px;
            }
            .heart-container {
              width: 300px;
              height: 270px;
            }
            .heart-particle {
              transform: translate(-50%, -50%) scale(0.75);
            }
          }
          @keyframes heartbeat {
            0%, 100% {
              transform: scale(1);
            }
            10% {
              transform: scale(1.15);
            }
            20% {
              transform: scale(1);
            }
            30% {
              transform: scale(1.2);
            }
            40% {
              transform: scale(1);
            }
          }
          @keyframes heartFloat {
            0%, 100% {
              transform: translateY(0px) translateX(0px);
            }
            25% {
              transform: translateY(-3px) translateX(2px);
            }
            50% {
              transform: translateY(-2px) translateX(-2px);
            }
            75% {
              transform: translateY(-2px) translateX(1px);
            }
          }
          @keyframes heartGlowPulse {
            0%, 100% {
              opacity: 0.6;
              filter: blur(40px);
            }
            50% {
              opacity: 0.8;
              filter: blur(45px);
            }
          }
          @keyframes particleColorShift {
            0% {
              background-color: #ff1744;
              box-shadow: 0 0 8px #ff1744, 0 0 12px rgba(255, 23, 68, 0.5);
            }
            33% {
              background-color: #ff6b9d;
              box-shadow: 0 0 8px #ff6b9d, 0 0 12px rgba(255, 107, 157, 0.5);
            }
            66% {
              background-color: #ffb3d1;
              box-shadow: 0 0 8px #ffb3d1, 0 0 12px rgba(255, 179, 209, 0.5);
            }
            100% {
              background-color: #ff1744;
              box-shadow: 0 0 8px #ff1744, 0 0 12px rgba(255, 23, 68, 0.5);
            }
          }
          @keyframes particleGlow {
            0%, 100% {
              opacity: 0.7;
              transform: translate(-50%, -50%) scale(1);
            }
            50% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1.3);
            }
          }
          .heart-particle {
            transition: background-color 0.3s ease, box-shadow 0.3s ease;
          }
        `}</style>
      </div>
      </div>
    </div>
  );
}
