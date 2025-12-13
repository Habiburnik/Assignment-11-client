import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Page Not Found - Ancient Quest';
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#d4a574] to-[#c19a6b] px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-[#432818] mb-4">404</h1>
        <h2 className="text-4xl font-bold text-[#7f5539] mb-6">Page Not Found</h2>
        <p className="text-lg text-[#9c6644] mb-8 max-w-md">
          The artifact you're looking for seems to have been lost to history. Let's get you back on track!
        </p>
        
        <div className="flex gap-4 justify-center flex-wrap">
          <button 
            onClick={() => navigate('/')}
            className="btn bg-[#432818] text-[#ede0d4] border-none hover:bg-[#5a3a24] px-8 py-3 text-lg"
          >
            Back to Home
          </button>
          <button 
            onClick={() => navigate('/allartifacts')}
            className="btn bg-[#9c6644] text-[#ede0d4] border-none hover:bg-[#b08968] px-8 py-3 text-lg"
          >
            View All Artifacts
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
