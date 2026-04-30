import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import { Package, MapPin, Heart, Settings, HelpCircle, ArrowRight } from 'lucide-react';

const sections = [
  { href: '/conta/encomendas', label: 'Encomendas', desc: 'Consulta e acompanha as tuas encomendas', icon: Package },
  { href: '/conta/moradas', label: 'Moradas', desc: 'Gere as tuas moradas de entrega', icon: MapPin },
  { href: '/conta/favoritos', label: 'Favoritos', desc: 'Os produtos que guardaste', icon: Heart },
  { href: '/conta/preferencias', label: 'Preferências', desc: 'Personaliza a tua experiência Lumara', icon: Settings },
  { href: '/conta/apoio', label: 'Apoio ao cliente', desc: 'Fala connosco — estamos aqui para ajudar', icon: HelpCircle },
];

export default async function ContaDashboardPage() {
  const user = await currentUser();
  const firstName = user?.firstName ?? '';
  const greeting = firstName ? `Bem-vinda de volta, ${firstName}.` : 'Bem-vinda de volta à Lumara.';

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A1A2E] mb-1">A minha conta</h1>
      <p className="text-sm text-[#6B6B8A] mb-6">{greeting}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {sections.map(({ href, label, desc, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group flex items-center gap-4 bg-white border border-[#E8E0F0] hover:border-[#B89EF0] rounded-2xl p-5 transition-all hover:shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-[#F3EFFE] flex items-center justify-center text-[#8B6BE0] shrink-0">
              <Icon size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#1A1A2E]">{label}</p>
              <p className="text-xs text-[#6B6B8A] mt-0.5 truncate">{desc}</p>
            </div>
            <ArrowRight size={16} className="text-[#B89EF0] group-hover:translate-x-0.5 transition-transform shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
