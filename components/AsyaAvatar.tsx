
import React from 'react';

interface AsyaAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  isAnimated?: boolean;
  fullBody?: boolean;
}

const AsyaAvatar: React.FC<AsyaAvatarProps> = ({ size = 'md', className = '', isAnimated = false, fullBody = false }) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-32 h-32',
    xl: 'w-64 h-64'
  };

  // SVG Karakter Asya (Custom Design)
  const AsyaSVG = () => (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl">
      {/* Rambut Belakang */}
      <path d="M40 100C40 60 70 40 100 40C130 40 160 60 160 100V140H40V100Z" fill="#5D4037"/>
      
      {/* Badan/Baju Pink */}
      {fullBody && (
        <path d="M70 140C70 140 60 180 100 180C140 180 130 140 130 140H70Z" fill="#F472B6"/>
      )}
      
      {/* Wajah */}
      <circle cx="100" cy="100" r="60" fill="#FFE0B2"/>
      
      {/* Rambut Depan / Ponytail */}
      <path d="M40 100C40 60 70 40 100 40C130 40 160 60 160 100C160 100 150 80 100 80C50 80 40 100 40 100Z" fill="#6D4C41"/>
      
      {/* Pita Pink Besar */}
      <path d="M75 45L100 55L125 45L120 30L100 40L80 30L75 45Z" fill="#EC4899" stroke="white" strokeWidth="2"/>
      <circle cx="100" cy="45" r="5" fill="#F472B6" />

      {/* Mata Berbinar */}
      <g className={isAnimated ? "animate-pulse" : ""}>
        <circle cx="80" cy="105" r="6" fill="#2D3748"/>
        <circle cx="120" cy="105" r="6" fill="#2D3748"/>
        <circle cx="78" cy="103" r="2" fill="white"/>
        <circle cx="118" cy="103" r="2" fill="white"/>
      </g>
      
      {/* Pipi Merona */}
      <circle cx="65" cy="115" r="8" fill="#F9A8D4" opacity="0.6"/>
      <circle cx="135" cy="115" r="8" fill="#F9A8D4" opacity="0.6"/>
      
      {/* Mulut Imut */}
      <path d="M95 125C95 125 97 130 100 130C103 130 105 125 105 125" stroke="#D53F8C" strokeWidth="2" strokeLinecap="round"/>

      {/* Pose Finger Heart (Hanya di Full Body) */}
      {fullBody && (
        <g className="animate-bounce" style={{ animationDuration: '3s' }}>
          <path d="M140 130L150 120M145 125L155 115" stroke="#F472B6" strokeWidth="3" strokeLinecap="round"/>
          <path d="M148 110C148 110 145 105 150 105C155 105 152 110 152 110L148 110Z" fill="#FB7185"/>
        </g>
      )}
    </svg>
  );

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Background Glow */}
      <div className={`absolute bg-pink-200 rounded-full blur-3xl opacity-20 ${sizeMap[size]} ${isAnimated ? 'animate-pulse' : ''}`}></div>
      
      <div className={`relative z-10 ${sizeMap[size]} ${isAnimated ? 'animate-float' : ''}`}>
        <AsyaSVG />
      </div>
      
      {isAnimated && (
        <div className="absolute -top-2 -right-2 text-2xl animate-bounce">✨</div>
      )}
    </div>
  );
};

export default AsyaAvatar;
