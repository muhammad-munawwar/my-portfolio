import React, { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, className = '', ...props }) => {
  return (
    <div className={className}>
      <label className="font-(--font-mono) text-gray-400 text-[0.8rem] tracking-[-0.02em] block mb-2">{label}</label>
      <textarea
        className="w-full bg-white/3 border border-blue-400/10 text-(--text) py-1 xl:py-1.5 2xl:py-2 px-2 xl:px-3 2xl:px-4 rounded-sm 2xl:rounded-md font-(--font-body) outline-none transition-colors duration-200 focus:border-(--primary) focus:bg-white/5 resize-none"
        {...props}
      />
    </div>
  );
};
