import Stars from './components/Stars';
import Heart from './components/Heart';

function App() {
  return (
    <div className="fixed inset-0 overflow-hidden bg-linear-to-b from-[#0a0e27] via-[#1a1f3a] to-[#2d3561]">
      <Stars />
      <Heart />
      <div className="absolute left-1/2 transform -translate-x-1/2 pointer-events-none" style={{ top: 'calc(15% + 480px)' }}>
        <h1 className="text-3xl md:text-4xl text-transparent bg-clip-text bg-linear-to-r from-[#ffb3d1] via-[#ff6b9d] to-[#ff1744] animate-fade-in-up text-center"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 400,
              fontStyle: 'italic',
              textShadow: '0 0 20px rgba(255, 23, 68, 0.5), 0 0 40px rgba(255, 107, 157, 0.3)',
              letterSpacing: '0.05em',
            }}>
          my heart beats for you
        </h1>
      </div>
    </div>
  );
}

export default App
