type SectionLabelProps = {
  children: React.ReactNode;
  light?: boolean;
};

export default function SectionLabel({ children, light = false }: SectionLabelProps) {
  return (
    <p
      className={`text-[11px] tracking-[0.12em] uppercase font-medium ${
        light ? 'text-lumara-gold' : 'text-lumara-gray'
      }`}
      style={{ fontFamily: 'var(--font-dm-sans)' }}
    >
      {children}
    </p>
  );
}
