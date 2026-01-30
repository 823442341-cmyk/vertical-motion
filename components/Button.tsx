import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading, 
  className = '', 
  disabled, 
  ...props 
}) => {
  // Memphis Style: Blocky, bold borders, hard shadows, vibrant colors
  
  const baseStyles = "inline-flex items-center justify-center font-comic tracking-wider transition-all duration-150 border-4 border-black disabled:opacity-50 disabled:cursor-not-allowed active:translate-y-1 active:translate-x-1 active:shadow-none";
  
  const variants = {
    // Blue Pop (Primary)
    primary: "bg-pop-blue text-white shadow-comic hover:bg-pop-blue/90 hover:shadow-comic-lg hover:-translate-y-1 hover:-translate-x-1",
    
    // Yellow Pop (Secondary)
    secondary: "bg-pop-yellow text-black shadow-comic hover:bg-pop-yellow/90 hover:shadow-comic-lg hover:-translate-y-1 hover:-translate-x-1",
    
    // Black High Contrast
    danger: "bg-black text-white border-black shadow-comic hover:bg-gray-800 hover:shadow-comic-lg",
    
    // White/Ghost
    ghost: "bg-white text-black shadow-comic hover:bg-gray-50 hover:shadow-comic-lg",
  };

  const sizes = {
    sm: "px-4 py-1 text-sm h-10",
    md: "px-8 py-3 text-xl h-14",
    lg: "px-10 py-4 text-3xl h-20",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="mr-3 w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      ) : null}
      {children}
    </button>
  );
};

export default Button;