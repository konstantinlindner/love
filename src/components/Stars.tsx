interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
  duration: number;
  twinkleDuration: number;
}

// Generate stars once at module level to avoid React Compiler errors
const generateStars = (): Star[] => {
  const starArray: Star[] = [];
  
  // Far layer - small stars, slow movement
  for (let i = 0; i < 30; i++) {
    starArray.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random(),
      opacity: 0.4 + Math.random() * 0.3,
      delay: Math.random() * 2,
      duration: 20 + Math.random() * 10,
      twinkleDuration: 2 + Math.random() * 2,
    });
  }
  
  // Mid layer - medium stars, medium speed
  for (let i = 30; i < 60; i++) {
    starArray.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random(),
      opacity: 0.5 + Math.random() * 0.3,
      delay: Math.random() * 2,
      duration: 15 + Math.random() * 8,
      twinkleDuration: 2 + Math.random() * 2,
    });
  }
  
  // Near layer - large stars, faster movement
  for (let i = 60; i < 90; i++) {
    starArray.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 3 + Math.random(),
      opacity: 0.6 + Math.random() * 0.3,
      delay: Math.random() * 2,
      duration: 10 + Math.random() * 5,
      twinkleDuration: 2 + Math.random() * 2,
    });
  }
  
  return starArray;
};

const stars = generateStars();

export default function Stars() {

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `starMove ${star.duration}s linear infinite, starTwinkle ${star.twinkleDuration}s ease-in-out infinite alternate`,
            animationDelay: `${star.delay}s`,
            transform: 'translateX(-100vw)',
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.8)`,
            willChange: 'transform, opacity',
          }}
        />
      ))}
      <style>{`
        @keyframes starMove {
          0% {
            transform: translateX(-100vw);
          }
          100% {
            transform: translateX(100vw);
          }
        }
        @keyframes starTwinkle {
          0% {
            opacity: 0.3;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
