import React, { forwardRef, InputHTMLAttributes } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ className = '', error, ...props }, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        className={`
          rounded-lg shadow-sm text-xs
          border border-[#e0e0e0]
          bg-[#F4F4F4]
          text-[#2C3E50]
          focus:outline-none focus:ring-2
          focus:border-[#1899D6]
          focus:ring-[#1899D6]
          transition
          w-full px-4 py-3 rounded bg-white text-[#2C3E50] border border-[#e0e0e0] focus:outline-none focus:ring-2 focus:ring-[#1899D6] transition
          ${error ? 'border-[#C84B31]' : ''}
          ${className}
        `}
      />
    );
  }
);

TextInput.displayName = 'TextInput';

export default TextInput; 