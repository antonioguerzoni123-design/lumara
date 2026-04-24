import Link from 'next/link';

const footerLinks = {
  Loja: [
    { href: '/loja?categoria=cabelo', label: 'Aparelhos de cabelo' },
    { href: '/loja?categoria=skincare', label: 'Skin care' },
    { href: '/loja?categoria=cuidados', label: 'Cuidados capilares' },
    { href: '/promocoes', label: 'Promoções de abertura' },
  ],
  Apoio: [
    { href: '/faq', label: 'Perguntas frequentes' },
    { href: '/contacto', label: 'Contacto' },
  ],
  Lumara: [
    { href: '/sobre-nos', label: 'A nossa filosofia' },
    { href: '/sobre-nos', label: 'Feito para Portugal' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-lumara-warm-black pt-[72px] pb-8" style={{ color: '#D5CFC7' }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 lg:gap-[60px]">

        {/* Brand */}
        <div>
          <p
            className="text-white text-[28px] font-black tracking-[-0.5px] mb-5 flex items-baseline gap-0.5"
            style={{ fontFamily: 'var(--font-nunito)' }}
          >
            lumara<span style={{ color: '#E0689F', fontSize: '10px', verticalAlign: 'super', lineHeight: 1 }}>●</span>
          </p>
          <p
            className="text-sm leading-[1.6] max-w-[320px]"
            style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-dm-sans)' }}
          >
            A primeira loja de beleza curada especialmente para Portugal.
            Equipamentos, skin care e cuidados capilares — seleccionados com intenção.
          </p>

          {/* Socials */}
          <div className="flex gap-3.5 mt-5">
            {[
              {
                label: 'Instagram',
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                  </svg>
                ),
              },
              {
                label: 'TikTok',
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 3v3a5 5 0 0 0 5 5v3a8 8 0 0 1-5-2v6a6 6 0 1 1-6-6v3a3 3 0 1 0 3 3V3h3z" />
                  </svg>
                ),
              },
              {
                label: 'Pinterest',
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M10 20c-.5-2 0-4 1-7 .5-1.5 1.5-3 3-3s3 1 3 3-1.5 4-3 4-2-1-2-1" />
                  </svg>
                ),
              },
            ].map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors"
                style={{
                  borderColor: 'rgba(255,255,255,0.2)',
                  color: 'rgba(255,255,255,0.7)',
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading}>
            <h5
              className="text-white text-[13px] font-semibold tracking-[0.12em] uppercase mb-[18px]"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              {heading}
            </h5>
            <ul className="flex flex-col gap-2.5">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{
                      color: 'rgba(255,255,255,0.7)',
                      fontFamily: 'var(--font-dm-sans)',
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div
        className="max-w-[1400px] mx-auto px-6 lg:px-10 mt-12 pt-[22px] border-t flex flex-col md:flex-row justify-between items-center gap-3 text-xs"
        style={{
          borderColor: 'rgba(255,255,255,0.1)',
          color: 'rgba(255,255,255,0.5)',
          fontFamily: 'var(--font-dm-sans)',
        }}
      >
        <span>© 2026 Lumara · A beleza curada para Portugal.</span>
        <span>Lisboa · Portugal 🇵🇹</span>
      </div>
    </footer>
  );
}
