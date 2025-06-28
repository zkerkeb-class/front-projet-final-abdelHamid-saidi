import React from 'react';

interface Button19Props {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button19: React.FC<Button19Props> = ({
  children,
  onClick,
  disabled = false,
  type = 'button',
  className = ''
}) => {
  return (
    <button
      className={`button-19 ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      role="button"
    >
      {children}
    </button>
  );
};

export default Button19; 