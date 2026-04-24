'use client';

type BadgeProps = {
  children: React.ReactNode;
  variant?: 'gold' | 'dark';
};

export default function Badge({ children, variant = 'gold' }: BadgeProps) {
  return (
    <span
      className={`inline-block px-2 py-0.5 text-[10px] tracking-widest uppercase font-medium ${
        variant === 'gold'
          ? 'bg-lumara-gold text-white'
          : 'bg-lumara-warm-black text-lumara-offwhite'
      }`}
      style={{ fontFamily: 'var(--font-dm-sans)' }}
    >
      {children}
    </span>
  );
}
