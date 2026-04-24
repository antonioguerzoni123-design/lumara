'use client';

import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-bold tracking-[0.04em] uppercase rounded-full transition-all duration-200 cursor-pointer';
  const sizes = {
    sm: 'px-5 py-2.5 text-[11px]',
    md: 'px-7 py-3 text-[12px]',
    lg: 'px-8 py-4 text-[13px]',
  };
  const variants = {
    primary:
      'bg-lumara-warm-black text-lumara-offwhite hover:bg-lumara-accent-dark border border-lumara-warm-black hover:border-lumara-accent-dark',
    outline:
      'bg-transparent text-lumara-warm-black border-[1.5px] border-lumara-warm-black hover:bg-lumara-warm-black hover:text-lumara-offwhite',
    ghost:
      'bg-transparent text-lumara-warm-black hover:text-lumara-accent-dark underline-offset-4 hover:underline px-0 rounded-none',
  };

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      style={{ fontFamily: 'var(--font-nunito)' }}
      {...props}
    >
      {children}
    </button>
  );
}
